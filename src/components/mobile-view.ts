import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../styles/tokens';
import { mobile } from '../styles/mobile';
import './mobile-header';
import './zone-row';
import type { ZoneViewModel, QuickAction } from '../model/types';

@customElement('themo-mobile-view')
export class ThemoMobileView extends LitElement {
  static styles = [tokens, mobile, css`:host{display:block;padding:4px;}`];
  @property({ attribute: false }) zones: ZoneViewModel[] = [];
  @property({ attribute: false }) quickActions: QuickAction[] = [];
  @property() outsideText: string | null = null;
  @property() energyToday: string | null = null;
  @property() energyCost: string | null = null;

  private get heatingCount() { return this.zones.filter((z) => z.heating).length; }

  private get dailyAvg(): number | null {
    const vals = this.zones.map((z) => z.heatingTodayPct).filter((v): v is number => v !== null);
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
  }

  render() {
    const avg = this.dailyAvg;
    return html`
      <themo-mobile-header .zones=${this.zones} .outsideText=${this.outsideText}
        .energyToday=${this.energyToday} .energyCost=${this.energyCost}></themo-mobile-header>

      ${this.quickActions.length ? html`
        <div class="chips-scroll">
          ${this.quickActions.map((a) => html`
            <button class="chip" @click=${() => this.dispatchEvent(new CustomEvent('quick-action', { detail: { action: a }, bubbles: true, composed: true }))}>${a.name}</button>`)}
        </div>` : ''}

      <div class="section-label">
        <span>Zones</span>
        <span class="count">${this.zones.length} · ${this.heatingCount} heating</span>
      </div>
      <div class="zlist">
        ${this.zones.map((z) => html`<themo-zone-row .zone=${z}></themo-zone-row>`)}
      </div>

      ${avg !== null ? html`
        <div class="mini-card">
          <div class="ic-circle"></div>
          <div class="ml">
            <div class="label">Daily heating · all zones</div>
            <div class="bar"><div class="fill" style="width:${avg}%"></div></div>
          </div>
          <div class="pct">${avg}%</div>
        </div>` : ''}
    `;
  }
}
