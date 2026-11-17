import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../styles/tokens';
import { mobile } from '../styles/mobile';
import type { ZoneViewModel, ZoneStatusResult } from '../model/types';

// Honest status line — real state data only (spec §3/§5), first match wins.
export function zoneStatus(z: ZoneViewModel, spot: number | null = null): ZoneStatusResult {
  if (z.connected === false) return { kind: 'offline', text: 'offline · cloud connection lost', pct: null };
  if (z.heating) return { kind: 'heating', text: 'heating', pct: z.heatingTodayPct };
  if (z.mode === 'auto' && z.priceLimit !== null && spot !== null && spot > z.priceLimit)
    return { kind: 'cap', text: `price cap · spot ${spot} > ${z.priceLimit} c/kWh`, pct: null };
  if (z.floorTemp !== null) return { kind: 'plain', text: `floor ${z.floorTemp}°`, pct: null };
  if (z.mode === 'off') return { kind: 'plain', text: 'off', pct: null };
  if (z.mode === 'auto' && z.currentTemp !== null && z.targetTemp !== null && z.currentTemp >= z.targetTemp)
    return { kind: 'plain', text: 'at setpoint', pct: null };
  return { kind: 'plain', text: z.mode, pct: null };
}

export const LOCK_ICON = svg`<svg class="lock-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`;
export const CLOUD_OFF_ICON = svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22.6 14.6A4.5 4.5 0 0 0 18 9h-1.3A7 7 0 0 0 6 6.3"/><path d="M6.5 9.7A4.5 4.5 0 0 0 7.5 18h9"/><line x1="3" y1="3" x2="21" y2="21"/></svg>`;

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
    .lock-ic { width: 12px; height: 12px; margin-left: 6px; vertical-align: -1px; color: var(--fg-soft); }
    .meta .cap { color: var(--warn); }
    .meta .offl { color: var(--warn); display: inline-flex; align-items: center; gap: 5px; }
    .meta .offl svg { width: 12px; height: 12px; flex-shrink: 0; }
    .zrow.offline { opacity: .55; }
  `];
  @property({ attribute: false }) zone!: ZoneViewModel;
  @property({ attribute: false }) spot: number | null = null;

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
    const cls = ['zrow', z.heating ? 'heating' : z.mode, z.connected === false ? 'offline' : ''].join(' ');
    return html`
      <div class="${cls}" @click=${() => this.open()}>
        <div class="ic">${this.icon()}</div>
        <div>
          <div class="name">${z.name}${z.childLockOn ? LOCK_ICON : ''}</div>
          <div class="meta">${(() => {
            const st = zoneStatus(z, this.spot);
            if (st.kind === 'offline') return html`<span class="offl">${CLOUD_OFF_ICON}offline</span>`;
            if (st.kind === 'heating') return html`<span class="st-heat">heating</span>${st.pct !== null ? html` · <span class="pct">${st.pct}% today</span>` : ''}`;
            if (st.kind === 'cap') return html`<span class="cap">${st.text}</span>`;
            return st.text;
          })()}</div>
        </div>
        <div class="now">${z.currentTemp ?? '—'}<span class="u">°</span><span class="tgt">→ ${z.targetTemp !== null ? html`${z.targetTemp}°`
          : z.mode === 'auto' ? html`<span class="auto-a">A</span>` : '—'}</span></div>
        <div class="mp"></div>
      </div>`;
  }
}
