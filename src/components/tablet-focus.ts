import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../styles/tokens';
import { tablet } from '../styles/tablet';
import { ringOffset, clampSetpoint, stepPrice, PRICE_STEP, RING_CIRCUMFERENCE } from '../model/zone-model';
import { LOCK_ICON, CLOUD_OFF_ICON } from './zone-row';
import type { ZoneViewModel, ThemoMode } from '../model/types';

const FOCUS_R = 80;
const FOCUS_CIRC = 2 * Math.PI * FOCUS_R;

const MODES: { mode: ThemoMode; name: string; icon: ReturnType<typeof svg> }[] = [
  { mode: 'off',  name: 'Off',  icon: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>` },
  { mode: 'heat', name: 'Heat', icon: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 14a4 4 0 0 1 8 0c0 3-2 4-4 6-2-2-4-3-4-6z"/><path d="M12 4v2"/></svg>` },
  { mode: 'auto', name: 'Auto', icon: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>` },
];

@customElement('themo-tablet-focus')
export class ThemoTabletFocus extends LitElement {
  // Preset chips are a deliberate addition over the mock — minimal local style for them.
  static styles = [tokens, tablet, css`
    :host { display: block; }
    .preset-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
    .pchip {
      height: 30px; padding: 0 12px; border-radius: 999px;
      background: var(--surface-2); border: 1px solid var(--border-2);
      color: var(--fg-soft); font-size: 12px; font-family: inherit; cursor: pointer;
    }
    .pchip.active { background: rgba(3,169,244,0.12); border-color: rgba(3,169,244,0.5); color: var(--accent); }
    .auto-a { color: var(--ok); font-weight: 600; }
    .dev-row { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
    .dev-chip { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border-radius: 999px; border: 1px solid var(--border-2); background: var(--surface-2); color: var(--fg-soft); font-size: 12px; font-family: inherit; cursor: pointer; }
    .dev-chip svg { width: 14px; height: 14px; }
    .dev-chip.active { background: rgba(3,169,244,0.12); border-color: rgba(3,169,244,0.5); color: var(--accent); }
    .price-row { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; }
    .plbl { font-family: var(--font-mono); font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); }
    .pu { font-size: 11px; color: var(--muted); }
    .mini-step { display: inline-flex; align-items: center; gap: 8px; }
    .mini-step button { width: 22px; height: 22px; border-radius: 6px; border: 1px solid var(--border-2); background: var(--surface-3); color: var(--accent); font-size: 14px; line-height: 1; cursor: pointer; padding: 0; }
    .mini-step button:disabled { opacity: .4; cursor: default; }
    .offchip { display: inline-flex; align-items: center; gap: 5px; color: var(--warn); font: 500 10px var(--font-mono); letter-spacing: .04em; margin-bottom: 8px; }
    .offchip svg { width: 12px; height: 12px; }
  `];
  @property({ attribute: false }) zone!: ZoneViewModel;

  private emit(type: string, detail: unknown = {}) {
    this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
  }
  private bump(delta: number) {
    const z = this.zone;
    const next = clampSetpoint((z.targetTemp ?? z.minTemp) + delta, z.minTemp, z.maxTemp, z.step);
    this.emit('setpoint-change', { temperature: next });
  }

  @state() private pendingPrice: number | null = null;
  private pendingFor: string | null = null;

  private bumpPrice(delta: number) {
    const base = this.pendingPrice ?? this.zone.priceLimit;
    if (base === null) return;
    const next = stepPrice(base, delta);
    this.pendingPrice = next;
    this.pendingFor = this.zone.climateEntityId;
    this.emit('pricelimit-change', { value: next });
  }

  willUpdate() {
    const z = this.zone;
    if (this.pendingPrice !== null && (z?.climateEntityId !== this.pendingFor || z?.priceLimit === this.pendingPrice)) {
      this.pendingPrice = null;
      this.pendingFor = null;
    }
  }

  render() {
    const z = this.zone;
    const offset = (ringOffset(z.currentTemp, z.minTemp, z.maxTemp) / RING_CIRCUMFERENCE) * FOCUS_CIRC;
    return html`
      <div class="focus-card">
        <div class="label">Selected zone</div>
        <div class="name">${z.name}</div>
        ${z.connected === false ? html`<div class="offchip">${CLOUD_OFF_ICON}offline</div>` : ''}
        <div class="ring-wrap">
          ${svg`<svg class="ring" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="${FOCUS_R}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
            <circle cx="100" cy="100" r="${FOCUS_R}" fill="none" stroke="var(--heat)" stroke-width="8"
              stroke-linecap="round" stroke-dasharray="${FOCUS_CIRC}" stroke-dashoffset="${offset}"
              transform="rotate(-90 100 100)"/>
          </svg>`}
          <div class="ring-num"><div>
            <div class="big">${z.currentTemp ?? '—'}<span class="u">°C</span></div>
            <div class="cap">Room</div>
          </div></div>
        </div>
        <div class="stepper">
          <button data-step-dn @click=${() => this.bump(-z.step)} ?disabled=${z.mode !== 'heat'}>−</button>
          <div class="val">${z.targetTemp !== null ? html`${z.targetTemp}<span class="u">°C</span>`
            : z.mode === 'auto' ? html`<span class="auto-a">A</span>` : html`—<span class="u">°C</span>`}</div>
          <button data-step-up @click=${() => this.bump(z.step)} ?disabled=${z.mode !== 'heat'}>+</button>
        </div>
        <div class="mode-row">
          ${MODES.map((m) => html`
            <div class="mode-tile ${z.mode === m.mode ? 'selected' : ''}" data-mode=${m.mode}
              @click=${() => this.emit('mode-change', { mode: m.mode })}>
              ${m.icon}<div class="name">${m.name}</div>
            </div>`)}
        </div>
        ${z.backlightEntityId !== null || z.childLockEntityId !== null ? html`
        <div class="dev-row">
          ${z.backlightEntityId !== null ? html`
            <button class="dev-chip ${z.backlightOn ? 'active' : ''}" data-backlight
              @click=${() => this.emit('backlight-toggle')}>Backlight · ${z.backlightOn === null ? '—' : z.backlightOn ? 'On' : 'Off'}</button>` : ''}
          ${z.childLockEntityId !== null ? html`
            <button class="dev-chip ${z.childLockOn ? 'active' : ''}" data-childlock
              @click=${() => this.emit('childlock-toggle')}>${LOCK_ICON}Child lock · ${z.childLockOn === null ? '—' : z.childLockOn ? 'Locked' : 'Open'}</button>` : ''}
        </div>` : ''}
        ${z.priceLimitEntityId !== null ? html`
        <div class="price-row">
          <span class="plbl">Price limit</span>
          <span class="mini-step">
            <button data-price-dn ?disabled=${z.priceLimit === null} @click=${() => this.bumpPrice(-PRICE_STEP)}>−</button>
            ${this.pendingPrice ?? z.priceLimit ?? '—'} <span class="pu">c/kWh</span>
            <button data-price-up ?disabled=${z.priceLimit === null} @click=${() => this.bumpPrice(PRICE_STEP)}>+</button>
          </span>
        </div>` : ''}
        ${z.presetModes.length ? html`
          <div class="preset-row">
            ${z.presetModes.map((p) => html`
              <button class="pchip ${z.presetMode === p ? 'active' : ''}" data-preset=${p}
                @click=${() => this.emit('preset-change', { preset: p })}>${p}</button>`)}
          </div>` : ''}
      </div>`;
  }
}
