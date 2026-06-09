import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../styles/tokens';
import { shared } from '../styles/shared';
import './zone-tile';
import type { ZoneViewModel, QuickAction } from '../model/types';

@customElement('themo-overview')
export class ThemoOverview extends LitElement {
  static styles = [tokens, shared, css`:host{display:block;}`];
  @property({ attribute: false }) zones: ZoneViewModel[] = [];
  @property() selectedId = '';
  @property() title = 'Themo Heating';
  @property({ attribute: false }) quickActions: QuickAction[] = [];
  @property() outsideText: string | null = null;
  @property() sunText: string | null = null;

  private get activeCount() { return this.zones.filter((z) => z.heating).length; }
  private get houseAvg(): number | null {
    const temps = this.zones.map((z) => z.currentTemp).filter((t): t is number => t !== null);
    return temps.length ? Math.round((temps.reduce((a, b) => a + b, 0) / temps.length) * 10) / 10 : null;
  }

  render() {
    const anyHeating = this.activeCount > 0;
    return html`
      <section class="ha-card themo-overview">
        <div class="card-head">
          <div>
            <div class="h-title">${this.title}</div>
            <div class="h-sub">${this.zones.length} thermostats · pd_hathemo</div>
          </div>
          <div class="spacer"></div>
          ${anyHeating ? html`<span class="pill heat"><span class="dot"></span>Heating now</span>` : ''}
          ${this.outsideText ? html`<span class="pill outside"><span class="dot"></span>Outside ${this.outsideText}</span>` : ''}
        </div>

        <div class="strip">
          <div class="stat"><div class="label">Active zones</div><div class="val">${this.activeCount}<span class="unit">/ ${this.zones.length}</span></div></div>
          <div class="stat"><div class="label">House avg</div><div class="val">${this.houseAvg ?? '—'}<span class="unit">°C</span></div></div>
          ${this.sunText ? html`<div class="stat"><div class="label">Sunrise → Sunset</div><div class="val">${this.sunText}</div></div>` : ''}
        </div>

        <div class="zones">
          ${this.zones.map((z) => html`
            <themo-zone-tile .zone=${z} ?selected=${z.climateEntityId === this.selectedId}></themo-zone-tile>`)}
        </div>

        ${this.quickActions.length ? html`
          <div class="quick-actions">
            <span class="qa-label">Quick actions</span>
            ${this.quickActions.map((a) => html`
              <button class="qa-chip" @click=${() => this.dispatchEvent(new CustomEvent('quick-action', { detail: { action: a }, bubbles: true, composed: true }))}>${a.name}</button>`)}
          </div>` : ''}

        <div class="legend">
          <div class="li"><span class="sw" style="background:var(--heat)"></span>Heating</div>
          <div class="li"><span class="sw" style="background:var(--accent)"></span>Auto</div>
          <div class="li"><span class="sw" style="background:var(--muted)"></span>Off</div>
        </div>
      </section>`;
  }
}
