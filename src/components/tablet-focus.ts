import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../styles/tokens';
import { tablet } from '../styles/tablet';
import { ringOffset, clampSetpoint, RING_CIRCUMFERENCE } from '../model/zone-model';
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

  render() {
    const z = this.zone;
    const offset = (ringOffset(z.currentTemp, z.minTemp, z.maxTemp) / RING_CIRCUMFERENCE) * FOCUS_CIRC;
    return html`
      <div class="focus-card">
        <div class="label">Selected zone</div>
        <div class="name">${z.name}</div>
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
          <div class="val">${z.targetTemp ?? '—'}<span class="u">°C</span></div>
          <button data-step-up @click=${() => this.bump(z.step)} ?disabled=${z.mode !== 'heat'}>+</button>
        </div>
        <div class="mode-row">
          ${MODES.map((m) => html`
            <div class="mode-tile ${z.mode === m.mode ? 'selected' : ''}" data-mode=${m.mode}
              @click=${() => this.emit('mode-change', { mode: m.mode })}>
              ${m.icon}<div class="name">${m.name}</div>
            </div>`)}
        </div>
        ${z.presetModes.length ? html`
          <div class="preset-row">
            ${z.presetModes.map((p) => html`
              <button class="pchip ${z.presetMode === p ? 'active' : ''}" data-preset=${p}
                @click=${() => this.emit('preset-change', { preset: p })}>${p}</button>`)}
          </div>` : ''}
      </div>`;
  }
}
