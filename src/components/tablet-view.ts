import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../styles/tokens';
import { tablet } from '../styles/tablet';
import './tablet-tile';
import './tablet-focus';
import type { ZoneViewModel, QuickAction } from '../model/types';

const round1 = (n: number) => Math.round(n * 10) / 10;

@customElement('themo-tablet-view')
export class ThemoTabletView extends LitElement {
  static styles = [tokens, tablet, css`
    :host { display: block; }
    .wrap {
      display: grid;
      grid-template-columns: 1fr 320px;
      grid-template-rows: auto 1fr auto;
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      background: var(--surface-2);
    }
    .topbar { grid-column: 1 / -1; }
    .zones-grid { grid-row: 2; grid-column: 1; }
    .zones-foot { grid-row: 3; grid-column: 1; }
    .rail { grid-row: 2 / span 2; grid-column: 2; }
  `];
  @property({ attribute: false }) zones: ZoneViewModel[] = [];
  @property() selectedId = '';
  @property({ attribute: false }) quickActions: QuickAction[] = [];
  @property() outsideText: string | null = null;
  @property() energyToday: string | null = null;
  @property() energyCost: string | null = null;
  @property() energySpot: string | null = null;

  private get heatingCount() { return this.zones.filter((z) => z.heating).length; }
  private get houseAvg(): number | null {
    const t = this.zones.map((z) => z.currentTemp).filter((v): v is number => v !== null);
    return t.length ? round1(t.reduce((a, b) => a + b, 0) / t.length) : null;
  }
  private get dailyAvg(): number | null {
    const v = this.zones.map((z) => z.heatingTodayPct).filter((x): x is number => x !== null);
    return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : null;
  }
  private get selectedZone(): ZoneViewModel | null {
    return this.zones.find((z) => z.climateEntityId === this.selectedId) ?? this.zones[0] ?? null;
  }

  render() {
    const sel = this.selectedZone;
    const avg = this.dailyAvg;
    return html`
      <div class="wrap">
        <div class="topbar">
          <div class="glance">
            ${this.outsideText ? html`<div class="gl"><div class="l">Outside</div><div class="v">${this.outsideText}</div></div>` : ''}
            <div class="gl"><div class="l">House avg</div><div class="v">${this.houseAvg ?? '—'}<span class="u">°C</span></div></div>
            ${this.energyToday ? html`<div class="gl"><div class="l">Today</div><div class="v">${this.energyToday}<span class="u">kWh</span></div></div>` : ''}
          </div>
          <div class="spacer"></div>
          ${this.heatingCount > 0 ? html`<div class="badge"><span class="dot"></span>Heating · ${this.heatingCount} of ${this.zones.length}</div>` : ''}
        </div>

        <div class="zones-grid">
          ${this.zones.map((z) => html`
            <themo-tablet-tile .zone=${z} ?selected=${z.climateEntityId === (sel?.climateEntityId ?? '')}></themo-tablet-tile>`)}
        </div>

        <div class="zones-foot">
          <div class="lbl">Daily heating · all zones</div>
          <div class="bar"><div class="fill" style="width:${avg ?? 0}%"></div></div>
          <div class="stat"><div class="v">${avg ?? '—'}<span class="u">%</span></div><div class="l">heating</div></div>
          ${this.energyToday ? html`<div class="stat"><div class="v">${this.energyToday}<span class="u">kWh</span></div><div class="l">energy</div></div>` : ''}
          ${this.energyCost ? html`<div class="stat"><div class="v">${this.energyCost}</div><div class="l">cost</div></div>` : ''}
          ${this.energySpot ? html`<div class="stat"><div class="v">${this.energySpot}</div><div class="l">spot avg</div></div>` : ''}
        </div>

        <aside class="rail">
          ${sel ? html`<themo-tablet-focus .zone=${sel}></themo-tablet-focus>` : ''}
          ${this.quickActions.length ? html`
            <div class="qa-stack">
              <div class="qa-label">House actions</div>
              <div class="qa-row">
                ${this.quickActions.map((a) => html`
                  <button class="qa-btn" @click=${() => this.dispatchEvent(new CustomEvent('quick-action', { detail: { action: a }, bubbles: true, composed: true }))}>
                    <div class="lbl-row">${a.name}</div>
                    ${a.description ? html`<div class="sub">${a.description}</div>` : ''}
                  </button>`)}
              </div>
            </div>` : ''}
        </aside>
      </div>`;
  }
}
