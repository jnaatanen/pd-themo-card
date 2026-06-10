import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../styles/tokens';
import { tablet } from '../styles/tablet';
import { zoneMeta } from './zone-row';
import type { ZoneViewModel, ThemoMode } from '../model/types';

const MODE_LABEL: Record<ThemoMode, string> = { off: 'Off', heat: 'Heat', auto: 'Auto' };

// Signed one-decimal delta vs target; null when either value is unknown.
export function deltaParts(current: number | null, target: number | null):
  { text: string; cool: boolean } | null {
  if (current === null || target === null) return null;
  const d = Math.round((current - target) * 10) / 10;
  return { text: `${d >= 0 ? '+' : ''}${d.toFixed(1)}°`, cool: d < 0 };
}

@customElement('themo-tablet-tile')
export class ThemoTabletTile extends LitElement {
  static styles = [tokens, tablet, css`:host{display:block;min-height:0;} .ztile{height:100%;}`];
  @property({ attribute: false }) zone!: ZoneViewModel;
  @property({ type: Boolean }) selected = false;

  private select() {
    this.dispatchEvent(new CustomEvent('zone-select', {
      detail: { entityId: this.zone.climateEntityId }, bubbles: true, composed: true,
    }));
  }

  render() {
    const z = this.zone;
    const delta = deltaParts(z.currentTemp, z.targetTemp);
    const cls = ['ztile', z.heating ? 'heating' : z.mode, this.selected ? 'selected' : ''].join(' ');
    return html`
      <div class="${cls}" @click=${() => this.select()}>
        <div>
          <div class="head">
            <div>
              <div class="name">${z.name}</div>
              <div class="entity">${z.climateEntityId}</div>
            </div>
            <div class="mp"><span class="sw"></span>${MODE_LABEL[z.mode]}</div>
          </div>
          <div class="big-temp">
            <div class="now">${z.currentTemp ?? '—'}</div>
            <div class="u">°C</div>
            ${delta ? html`<div class="delta ${delta.cool ? 'cool' : ''}">${delta.text}</div>` : ''}
          </div>
          <div class="target-line">→ <span class="target">${z.targetTemp !== null ? `${z.targetTemp}°` : '—'}</span>${z.targetTemp !== null ? ' setpoint' : ''}</div>
          <div class="meta-line">${zoneMeta(z)}</div>
        </div>
      </div>`;
  }
}
