import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../styles/tokens';
import { shared } from '../styles/shared';
import { zoneStatus, LOCK_ICON, CLOUD_OFF_ICON } from './zone-row';
import type { ZoneViewModel } from '../model/types';

const MODE_LABEL: Record<string, string> = { off: 'Off', heat: 'Heat', auto: 'Auto' };

@customElement('themo-zone-tile')
export class ThemoZoneTile extends LitElement {
  static styles = [tokens, shared, css`
    :host{display:contents;}
    .auto-a { color: var(--ok); font-weight: 600; }
    .zone-meta .st-heat { color: var(--heat); }
    .zone-meta .pct { color: var(--fg-soft); }
    .lock-ic { width: 12px; height: 12px; margin-left: 6px; vertical-align: -1px; color: var(--fg-soft); }
    .zone-meta .cap { color: var(--warn); }
    .zone-meta .offl { color: var(--warn); display: inline-flex; align-items: center; gap: 5px; }
    .zone-meta .offl svg { width: 12px; height: 12px; flex-shrink: 0; }
    .zone.offline { opacity: .55; }
  `];
  @property({ attribute: false }) zone!: ZoneViewModel;
  @property({ attribute: false }) spot: number | null = null;
  @property({ type: Boolean }) selected = false;

  private select() {
    this.dispatchEvent(new CustomEvent('zone-select', {
      detail: { entityId: this.zone.climateEntityId }, bubbles: true, composed: true,
    }));
  }

  render() {
    const z = this.zone;
    const cls = ['zone', z.heating ? 'heating' : '', this.selected ? 'active-detail' : '', z.connected === false ? 'offline' : ''].join(' ');
    return html`
      <div class="${cls}" @click=${() => this.select()}>
        <div class="zone-head">
          <div>
            <div class="zone-name">${z.name}${z.childLockOn ? LOCK_ICON : ''}</div>
            <div class="zone-entity">${z.climateEntityId}</div>
          </div>
        </div>
        <div class="zone-temp">
          <div class="now">${z.currentTemp ?? '—'}<span class="unit">°</span></div>
          <div class="target">→ <span>${z.targetTemp !== null ? html`${z.targetTemp}°`
            : z.mode === 'auto' ? html`<span class="auto-a">A</span>` : '—'}</span></div>
        </div>
        <div class="zone-meta">${(() => {
          const st = zoneStatus(z, this.spot);
          if (st.kind === 'offline') return html`<span class="offl">${CLOUD_OFF_ICON}${st.text}</span>`;
          if (st.kind === 'cap') return html`<span class="cap">${st.text}</span>`;
          return html`${z.heating ? html`<span class="st-heat">heating</span>` : 'idle'}${z.heatingTodayPct !== null ? html` · <span class="pct">${z.heatingTodayPct}% today</span>` : ''}`;
        })()}</div>
        <div class="zone-foot">
          <button class="mode-pill ${z.mode}"><span class="swatch"></span>${MODE_LABEL[z.mode]}</button>
        </div>
      </div>`;
  }
}
