import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from '../styles/tokens';
import { mobile } from '../styles/mobile';
import { ringOffset, clampSetpoint, stepPrice, PRICE_STEP, RING_CIRCUMFERENCE } from '../model/zone-model';
import { LOCK_ICON, CLOUD_OFF_ICON } from './zone-row';
import type { ZoneViewModel, ThemoMode } from '../model/types';

const MINI_R = 58;
const MINI_CIRC = 2 * Math.PI * MINI_R;

const MODES: { mode: ThemoMode; name: string; icon: ReturnType<typeof svg> }[] = [
  { mode: 'off',  name: 'Off',  icon: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>` },
  { mode: 'heat', name: 'Heat', icon: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 14a4 4 0 0 1 8 0c0 3-2 4-4 6-2-2-4-3-4-6z"/><path d="M12 4v2"/></svg>` },
  { mode: 'auto', name: 'Auto', icon: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>` },
];

@customElement('themo-mobile-sheet')
export class ThemoMobileSheet extends LitElement {
  static styles = [tokens, mobile, css`
    :host{display:contents;} .auto-a { color: var(--ok); font-weight: 600; }
    .stepper.auto { display: flex; align-items: center; justify-content: center; }
    .stepper.auto .val { border: 0; display: flex; align-items: baseline; gap: 5px; }
    .mini-step { display: inline-flex; align-items: center; gap: 8px; }
    .mini-step button { width: 22px; height: 22px; border-radius: 6px; border: 1px solid var(--border-2); background: var(--surface-3); color: var(--accent); font-size: 14px; line-height: 1; cursor: pointer; padding: 0; }
    .mini-step button:disabled { opacity: .4; cursor: default; }
    .kv .sub { font-family: var(--font-mono); font-size: 9px; color: var(--muted); letter-spacing: .1em; text-transform: uppercase; margin-top: 3px; }
    .kv .lock-ic { width: 13px; height: 13px; }
    .offchip { display: inline-flex; align-items: center; gap: 5px; color: var(--warn); font: 500 10px var(--font-mono); letter-spacing: .04em; }
    .offchip svg { width: 12px; height: 12px; }
  `];
  @property({ attribute: false }) zone!: ZoneViewModel;
  @property() nextChangeText: string | null = null;

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
    const offset = (ringOffset(z.currentTemp, z.minTemp, z.maxTemp) / RING_CIRCUMFERENCE) * MINI_CIRC;
    return html`
      <div class="sheet-backdrop" @click=${() => this.emit('sheet-close')}></div>
      <div class="sheet">
        <div class="grabber" @click=${() => this.emit('sheet-close')}></div>
        <div class="head">
          <div class="name">${z.name}</div>
          <div class="entity">${z.climateEntityId}</div>
          ${z.connected === false ? html`<div class="offchip">${CLOUD_OFF_ICON}offline</div>` : ''}
        </div>
        <div class="dial-row">
          <div class="mini-ring">
            ${svg`<svg viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="${MINI_R}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
              <circle cx="70" cy="70" r="${MINI_R}" fill="none" stroke="var(--heat)" stroke-width="8"
                stroke-linecap="round" stroke-dasharray="${MINI_CIRC}" stroke-dashoffset="${offset}"
                transform="rotate(-90 70 70)"/>
            </svg>`}
            <div class="num"><div>
              <div class="big">${z.currentTemp ?? '—'}<span class="u">°C</span></div>
              <div class="lbl">Room</div>
            </div></div>
          </div>
          <div class="target-stack">
            <div>
              <div class="lbl">${z.mode === 'auto' ? `Target${z.scheduleName ? ` · ${z.scheduleName}` : ''}` : 'Setpoint'}</div>
              ${z.mode === 'auto' ? html`
              <div class="stepper auto" data-auto-target>
                <div class="val"><span class="auto-a">A</span>${z.scheduledTemp !== null ? html`${z.scheduledTemp}<span class="u">°C</span>` : ''}</div>
              </div>`
              : html`
              <div class="stepper">
                <button data-step-dn @click=${() => this.bump(-z.step)} ?disabled=${z.mode !== 'heat'}>−</button>
                <div class="val">${z.targetTemp !== null ? html`${z.targetTemp}<span class="u">°C</span>` : html`—<span class="u">°C</span>`}</div>
                <button data-step-up @click=${() => this.bump(z.step)} ?disabled=${z.mode !== 'heat'}>+</button>
              </div>`}
            </div>
          </div>
        </div>
        <div class="mode-row">
          ${MODES.map((m) => html`
            <div class="mode-tile ${z.mode === m.mode ? `selected ${m.mode === 'auto' ? 'auto' : ''}` : ''}"
              data-mode=${m.mode} @click=${() => this.emit('mode-change', { mode: m.mode })}>
              ${m.icon}<div class="name">${m.name}</div>
            </div>`)}
        </div>
        <div class="kvs">
          <div class="kv"><div class="k">Heating</div>
            <div class="v ${z.heating ? 'heat' : ''}">${z.heating ? 'Active' : 'Idle'}${z.heatingTodayPct !== null ? ` · ${z.heatingTodayPct}% today` : ''}</div></div>
          <div class="kv"><div class="k">Daily</div>
            <div class="v">${z.heatingTodayPct !== null ? `${z.heatingTodayPct}%` : '—'}</div></div>
          <div class="kv" data-backlight style="cursor:pointer"
            @click=${() => z.backlightEntityId && this.emit('backlight-toggle')}>
            <div class="k">Backlight</div>
            <div class="v accent">${z.backlightOn === null ? '—' : z.backlightOn ? 'On' : 'Off'}</div></div>
          <div class="kv"><div class="k">Next change</div>
            <div class="v">${this.nextChangeText ?? '—'}</div></div>
          ${z.childLockEntityId !== null ? html`
          <div class="kv" data-childlock style="cursor:pointer" @click=${() => this.emit('childlock-toggle')}>
            <div class="k">Child lock</div>
            <div class="v" style="color:${z.childLockOn ? 'var(--accent)' : 'var(--muted)'};display:flex;align-items:center;gap:6px">${LOCK_ICON}${z.childLockOn === null ? '—' : z.childLockOn ? 'Locked' : 'Open'}</div>
            <div class="sub">${z.childLockOn ? 'tap to unlock' : 'tap to lock'}</div>
          </div>` : ''}
          ${z.priceLimitEntityId !== null ? html`
          <div class="kv">
            <div class="k">Price limit</div>
            <div class="v mini-step">
              <button data-price-dn ?disabled=${z.priceLimit === null} @click=${() => this.bumpPrice(-PRICE_STEP)}>−</button>
              ${this.pendingPrice ?? z.priceLimit ?? '—'} c/kWh
              <button data-price-up ?disabled=${z.priceLimit === null} @click=${() => this.bumpPrice(PRICE_STEP)}>+</button>
            </div>
          </div>` : ''}
        </div>
      </div>`;
  }
}
