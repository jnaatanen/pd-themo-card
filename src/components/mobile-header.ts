import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../styles/tokens';
import { mobile } from '../styles/mobile';
import type { ZoneViewModel } from '../model/types';

const round1 = (n: number) => Math.round(n * 10) / 10;

@customElement('themo-mobile-header')
export class ThemoMobileHeader extends LitElement {
  static styles = [tokens, mobile, css`:host{display:block;}`];
  @property({ attribute: false }) zones: ZoneViewModel[] = [];
  @property() outsideText: string | null = null;
  @property() energyToday: string | null = null;
  @property() energyCost: string | null = null;

  private get activeCount() { return this.zones.filter((z) => z.heating).length; }

  private avg(pick: (z: ZoneViewModel) => number | null): number | null {
    const vals = this.zones.map(pick).filter((v): v is number => v !== null);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
  }

  render() {
    const houseAvg = this.avg((z) => z.currentTemp);
    const targetAvg = this.avg((z) => z.targetTemp);
    const delta = houseAvg !== null && targetAvg !== null ? round1(houseAvg - targetAvg) : null;
    return html`
      <div class="head-card">
        <div class="row">
          ${this.activeCount > 0 ? html`<div class="badge"><span class="dot"></span>Heating now</div>` : html`<div></div>`}
          ${this.outsideText ? html`<div class="outside">Outside ${this.outsideText}</div>` : ''}
        </div>
        <div class="big-temp">
          <div class="now">${houseAvg !== null ? round1(houseAvg) : '—'}<span class="unit">°</span></div>
          ${delta !== null ? html`<div class="delta">${delta >= 0 ? '+' : ''}${delta.toFixed(1)}° vs target</div>` : ''}
        </div>
        <div class="sub">House average · ${this.activeCount} of ${this.zones.length} zones active</div>
        <div class="breakdown">
          <div class="b"><div class="k">Active</div><div class="v">${this.activeCount}<span class="small"> / ${this.zones.length}</span></div></div>
          ${this.energyToday ? html`<div class="b"><div class="k">Today kWh</div><div class="v">${this.energyToday}</div></div>` : ''}
          ${this.energyCost ? html`<div class="b"><div class="k">Cost</div><div class="v">${this.energyCost}</div></div>` : ''}
        </div>
      </div>`;
  }
}
