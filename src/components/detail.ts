import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../styles/tokens';
import { shared } from '../styles/shared';
import { ringOffset, clampSetpoint, RING_CIRCUMFERENCE, stepPrice, PRICE_STEP } from '../model/zone-model';
import { LOCK_ICON, CLOUD_OFF_ICON } from './zone-row';
import type { ZoneViewModel, ThemoMode } from '../model/types';

const MODES: { mode: ThemoMode; name: string; desc: string }[] = [
  { mode: 'off', name: 'Off', desc: 'power off' },
  { mode: 'heat', name: 'Heat', desc: 'manual setpoint' },
  { mode: 'auto', name: 'Auto', desc: 'follow schedule' },
];

@customElement('themo-detail')
export class ThemoDetail extends LitElement {
  static styles = [tokens, shared, css`
    :host{display:block;}
    .auto-a { color: var(--ok); font-weight: 600; }
    .stepper.auto { display: flex; align-items: center; justify-content: center; }
    .stepper.auto .val { border: 0; display: flex; align-items: baseline; gap: 6px; }
    .mini-step { display: inline-flex; align-items: center; gap: 8px; }
    .mini-step button { width: 22px; height: 22px; border-radius: 6px; border: 1px solid var(--border-2); background: var(--surface-3); color: var(--accent); font-size: 14px; line-height: 1; cursor: pointer; padding: 0; }
    .mini-step button:disabled { opacity: .4; cursor: default; }
    .kv .lock-ic { width: 14px; height: 14px; }
    .offchip { display: inline-flex; align-items: center; gap: 5px; color: var(--warn); font: 500 11px var(--font-mono); letter-spacing: .04em; margin-top: 4px; }
    .offchip svg { width: 12px; height: 12px; }
  `];
  @property({ attribute: false }) zone!: ZoneViewModel;
  @property({ attribute: false }) todayRow: (number | null)[] | null = null;
  @property() nextChangeText: string | null = null;
  @property({ type: Number }) nowHour = 0;
  @property({ type: Number }) step = 0.5;

  private emit(type: string, detail: unknown) {
    this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
  }

  private bump(delta: number) {
    const z = this.zone;
    const base = z.targetTemp ?? z.minTemp;
    const next = clampSetpoint(base + delta, z.minTemp, z.maxTemp, z.step);
    this.emit('setpoint-change', { temperature: next });
  }

  @state() private pendingPrice: number | null = null;
  private pendingFor: string | null = null;
  private pendingAt = 0;

  private bumpPrice(delta: number) {
    const base = this.pendingPrice ?? this.zone.priceLimit;
    if (base === null) return;
    const next = stepPrice(base, delta);
    this.pendingPrice = next;
    this.pendingAt = Date.now();
    this.pendingFor = this.zone.climateEntityId;
    this.emit('pricelimit-change', { value: next });
  }

  willUpdate() {
    const z = this.zone;
    if (this.pendingPrice !== null && (z?.climateEntityId !== this.pendingFor
        || z?.priceLimit === this.pendingPrice
        || Date.now() - this.pendingAt > 10_000)) {
      this.pendingPrice = null;
      this.pendingFor = null;
    }
  }

  render() {
    const z = this.zone;
    const offset = ringOffset(z.currentTemp, z.minTemp, z.maxTemp);
    const showSchedule = z.presetModes.length > 0;
    return html`
      <section class="ha-card themo-detail">
        <div class="detail-head">
          <div class="detail-eyebrow">Selected zone</div>
          <div class="detail-title">${z.name}</div>
          <div class="detail-entity">${z.climateEntityId}</div>
          ${z.connected === false ? html`<div class="offchip">${CLOUD_OFF_ICON}offline</div>` : ''}
        </div>

        <div class="ring-stage">
          <div class="ring">
            ${svg`<svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
              <circle cx="100" cy="100" r="84" fill="none" stroke="var(--heat)" stroke-width="10"
                stroke-linecap="round" stroke-dasharray="${RING_CIRCUMFERENCE}" stroke-dashoffset="${offset}"
                transform="rotate(-90 100 100)"/>
            </svg>`}
            <div class="ring-num"><div>
              <div class="now-big">${z.currentTemp ?? '—'}<span class="unit">°C</span></div>
              <div class="now-cap">Room temp</div>
            </div></div>
          </div>
          <div class="target-col">
            <div>
              <div class="label">${z.mode === 'auto' ? `Target${z.scheduleName ? ` · ${z.scheduleName}` : ''}` : 'Setpoint'}</div>
              ${z.mode === 'auto' ? html`
              <div class="stepper auto" data-auto-target>
                <div class="val"><span class="auto-a">A</span>${z.scheduledTemp !== null ? html`<span>${z.scheduledTemp}</span><span class="unit">°C</span>` : ''}</div>
              </div>`
              : html`
              <div class="stepper">
                <button data-step-dn @click=${() => this.bump(-z.step)} ?disabled=${z.mode !== 'heat'}>−</button>
                <div class="val">${z.targetTemp !== null ? html`<span>${z.targetTemp}</span><span class="unit">°C</span>` : html`<span>—</span><span class="unit">°C</span>`}</div>
                <button data-step-up @click=${() => this.bump(z.step)} ?disabled=${z.mode !== 'heat'}>+</button>
              </div>`}
            </div>
          </div>
        </div>

        <div class="mode-row">
          ${MODES.map((m) => html`
            <div class="mode-tile ${z.mode === m.mode ? 'selected' : ''}" data-mode=${m.mode}
              @click=${() => this.emit('mode-change', { mode: m.mode })}>
              <div><div class="name">${m.name}</div><div class="desc">${m.desc}</div></div>
            </div>`)}
        </div>

        <div class="detail-grid">
          <div class="kv"><div class="k">Room sensor</div><div class="v">${z.roomTemp ?? '—'}<span class="unit">°C</span></div></div>
          <div class="kv"><div class="k">Heating action</div><div class="v" style="color:var(--heat)">${z.heating ? 'Active' : 'Idle'}</div></div>
          <div class="kv"><div class="k">Daily heating</div><div class="v">${z.heatingTodayPct ?? '—'}<span class="unit">%</span></div></div>
          <div class="kv" data-backlight style="cursor:pointer"
            @click=${() => z.backlightEntityId && this.emit('backlight-toggle', {})}>
            <div class="k">Backlight</div>
            <div class="v" style="color:var(--accent)">${z.backlightOn === null ? '—' : z.backlightOn ? 'On' : 'Off'}</div>
          </div>
          ${z.childLockEntityId !== null ? html`
          <div class="kv" data-childlock style="cursor:pointer" @click=${() => this.emit('childlock-toggle', {})}>
            <div class="k">Child lock</div>
            <div class="v" style="color:${z.childLockOn ? 'var(--accent)' : 'var(--muted)'};display:flex;align-items:center;gap:7px">${LOCK_ICON}${z.childLockOn === null ? '—' : z.childLockOn ? 'Locked' : 'Open'}</div>
            <div class="sub">${z.childLockOn ? 'tap to unlock' : 'tap to lock'}</div>
          </div>` : ''}
          ${z.priceLimitEntityId !== null ? html`
          <div class="kv">
            <div class="k">Price limit</div>
            <div class="v mini-step">
              <button data-price-dn ?disabled=${z.priceLimit === null} @click=${() => this.bumpPrice(-PRICE_STEP)}>−</button>
              ${this.pendingPrice ?? z.priceLimit ?? '—'}<span class="unit">c/kWh</span>
              <button data-price-up ?disabled=${z.priceLimit === null} @click=${() => this.bumpPrice(PRICE_STEP)}>+</button>
            </div>
            <div class="sub">auto skips pricier hours</div>
          </div>` : ''}
        </div>

        ${showSchedule ? this.renderSchedule(z) : ''}
      </section>`;
  }

  private renderSchedule(z: ZoneViewModel) {
    const row = this.todayRow ?? new Array(24).fill(null);
    const max = Math.max(...row.map((v) => v ?? 0), 1);
    const level = (v: number | null) => (v === null ? 0 : Math.ceil((v / max) * 3));
    return html`
      <div class="schedule">
        <div class="schedule-head">
          <div class="title">Today's schedule</div>
          <div class="next">${this.nextChangeText
            ? html`Next change <strong>${this.nextChangeText}</strong>`
            : 'No upcoming changes'}</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${z.presetModes.map((p) => html`
            <button class="qa-chip ${z.presetMode === p ? 'active' : ''}" data-preset=${p}
              @click=${() => this.emit('preset-change', { preset: p })}>${p}</button>`)}
        </div>
        <div class="heatmap">
          <div class="row-lbl">Today</div>
          <div class="hour-row">
            ${row.map((v, h) => html`<div class="cell"
              data-h=${level(v) || ''} ?data-now=${h === this.nowHour}></div>`)}
          </div>
        </div>
      </div>`;
  }
}
