import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../styles/tokens';
import { mobile } from '../styles/mobile';
import type { ZoneViewModel } from '../model/types';

// Honest meta line — built only from real state data (spec §3), first match wins.
export function zoneMeta(z: ZoneViewModel): string {
  if (z.heating) return z.heatingTodayPct !== null ? `heating · ${z.heatingTodayPct}% today` : 'heating';
  if (z.floorTemp !== null) return `floor ${z.floorTemp}°`;
  if (z.mode === 'off') return 'off';
  if (z.mode === 'auto' && z.currentTemp !== null && z.targetTemp !== null && z.currentTemp >= z.targetTemp) return 'at setpoint';
  return z.mode;
}

const IC_THERMO = svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>`;
const IC_CLOCK  = svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>`;
const IC_OFF    = svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`;

@customElement('themo-zone-row')
export class ThemoZoneRow extends LitElement {
  static styles = [tokens, mobile, css`
    :host{display:block;}
    .auto-a { color: var(--ok); font-weight: 600; }
    .meta .st-heat { color: var(--heat); }
    .meta .pct { color: var(--fg-soft); }
  `];
  @property({ attribute: false }) zone!: ZoneViewModel;

  private icon() {
    if (this.zone.heating) return IC_THERMO;
    if (this.zone.mode === 'auto') return IC_CLOCK;
    if (this.zone.mode === 'off') return IC_OFF;
    return IC_THERMO;
  }

  private open() {
    this.dispatchEvent(new CustomEvent('zone-open', {
      detail: { entityId: this.zone.climateEntityId }, bubbles: true, composed: true,
    }));
  }

  render() {
    const z = this.zone;
    const cls = ['zrow', z.heating ? 'heating' : z.mode].join(' ');
    return html`
      <div class="${cls}" @click=${() => this.open()}>
        <div class="ic">${this.icon()}</div>
        <div>
          <div class="name">${z.name}</div>
          <div class="meta">${z.heating
            ? html`<span class="st-heat">heating</span>${z.heatingTodayPct !== null ? html` · <span class="pct">${z.heatingTodayPct}% today</span>` : ''}`
            : zoneMeta(z)}</div>
        </div>
        <div class="now">${z.currentTemp ?? '—'}<span class="u">°</span><span class="tgt">→ ${z.targetTemp !== null ? html`${z.targetTemp}°`
          : z.mode === 'auto' ? html`<span class="auto-a">A</span>` : '—'}</span></div>
        <div class="mp"></div>
      </div>`;
  }
}
