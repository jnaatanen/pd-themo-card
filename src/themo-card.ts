import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import { tokens } from './styles/tokens';
import { parseConfig } from './model/config';
import { discoverZones, buildZoneViewModel } from './model/zone-model';
import { activeSchedule, todayRow, nextChange } from './model/schedule';
import { ScheduleService } from './schedule-service';
import { setTemperature, setMode, setPreset, toggleBacklight, runQuickAction } from './actions';
import type { CardConfig, ScheduleData, ZoneViewModel } from './model/types';
import './components/overview';
import './components/detail';
import './components/glance';

@customElement('themo-card')
export class ThemoCard extends LitElement {
  static styles = [tokens, css`
    .view { display:grid; grid-template-columns: 1fr 460px; gap:24px; padding:8px; }
    .right-col { display:flex; flex-direction:column; gap:18px; }
    @container (max-width: 1100px) { .view { grid-template-columns: 1fr; } }
    :host { container-type: inline-size; }
  `];

  @state() private config!: CardConfig;
  @state() private selectedId: string | null = null;
  @state() private scheduleData: ScheduleData | null = null;
  private _hass!: HomeAssistant;
  private schedules = new ScheduleService();
  private lastFetchedDeviceId: number | null = null;

  setConfig(raw: unknown) { this.config = parseConfig(raw as Parameters<typeof parseConfig>[0]); }
  getCardSize() { return 12; }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.requestUpdate();
    this.maybeFetchSchedule();
  }
  get hass() { return this._hass; }

  private zones(): ZoneViewModel[] {
    if (!this._hass || !this.config) return [];
    return discoverZones(this._hass, this.config.entities)
      .map((id) => buildZoneViewModel(this._hass, id, this.config.step))
      .filter((z): z is ZoneViewModel => z !== null);
  }

  private selected(zones: ZoneViewModel[]): ZoneViewModel | null {
    if (!zones.length) return null;
    const id = this.selectedId ?? this.config.default_zone ?? zones[0].climateEntityId;
    return zones.find((z) => z.climateEntityId === id) ?? zones[0];
  }

  private async maybeFetchSchedule() {
    const sel = this.selected(this.zones());
    const devId = sel?.themoDeviceId ?? null;
    if (devId === null || devId === this.lastFetchedDeviceId) return;
    this.lastFetchedDeviceId = devId;
    this.scheduleData = await this.schedules.get(this._hass, devId);
    this.requestUpdate();
  }

  private onSelect(entityId: string) {
    this.selectedId = entityId;
    this.scheduleData = null;
    this.maybeFetchSchedule();
  }

  private sunText(): string | null {
    const id = this.config.sun_entity;
    if (!id) return null;
    const st = this._hass.states[id];
    if (!st) return null;
    const fmt = (iso?: string) => (iso ? new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—');
    return `${fmt(st.attributes.next_rising as string | undefined)} → ${fmt(st.attributes.next_setting as string | undefined)}`;
  }

  private energyGlance() {
    const id = this.config.energy?.today_entity;
    if (!id) return '';
    const st = this._hass.states[id];
    if (!st) return '';
    return html`<themo-glance .value=${st.state} .unit=${(st.attributes as Record<string, string>).unit_of_measurement ?? 'kWh'} .sub=${'today · all zones'}></themo-glance>`;
  }

  render() {
    if (!this.config || !this._hass) return html``;
    const zones = this.zones();
    const sel = this.selected(zones);
    const outside = sel?.outsideTemp ?? null;
    const sched = activeSchedule(this.scheduleData);
    const day = new Date().getDay();   // 0=Sun..6=Sat (matches the integration)
    const nowHour = new Date().getHours();
    const row = sched ? todayRow(sched, day) : null;
    const nc = sched ? nextChange(sched, day, nowHour) : null;

    return html`
      <div class="view">
        <themo-overview
          .zones=${zones} .selectedId=${sel?.climateEntityId ?? ''} .title=${this.config.title}
          .quickActions=${this.config.quick_actions}
          .outsideText=${outside !== null ? `${outside}°C` : null}
          .sunText=${this.sunText()}
          @zone-select=${(e: CustomEvent) => this.onSelect((e.detail as { entityId: string }).entityId)}
          @quick-action=${(e: CustomEvent) => runQuickAction(this._hass, (e.detail as { action: Parameters<typeof runQuickAction>[1] }).action)}
        ></themo-overview>
        <div class="right-col">
          ${sel ? html`<themo-detail
            .zone=${sel} .todayRow=${row} .nextChange=${nc} .nowHour=${nowHour} .step=${this.config.step}
            @setpoint-change=${(e: CustomEvent) => setTemperature(this._hass, sel.climateEntityId, (e.detail as { temperature: number }).temperature)}
            @mode-change=${(e: CustomEvent) => setMode(this._hass, sel.climateEntityId, (e.detail as { mode: Parameters<typeof setMode>[2] }).mode)}
            @preset-change=${(e: CustomEvent) => this.onPreset(sel, (e.detail as { preset: string }).preset)}
            @backlight-toggle=${() => sel.backlightEntityId && toggleBacklight(this._hass, sel.backlightEntityId, sel.backlightOn ?? false)}
          ></themo-detail>` : html`<div>No Themo thermostats found.</div>`}
          ${this.energyGlance()}
        </div>
      </div>`;
  }

  private async onPreset(sel: ZoneViewModel, preset: string) {
    await setPreset(this._hass, sel.climateEntityId, preset);
    if (sel.themoDeviceId !== null) {
      this.schedules.invalidate(sel.themoDeviceId);
      this.lastFetchedDeviceId = null;
      this.maybeFetchSchedule();
    }
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'themo-card',
  name: "PapaDog's Themo Control Card",
  description: 'Multi-thermostat companion card for the pd_hathemo integration',
});
