import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../styles/tokens';
import { shared } from '../styles/shared';

@customElement('themo-glance')
export class ThemoGlance extends LitElement {
  static styles = [tokens, shared, css`:host{display:block;}`];
  @property() value = '';
  @property() unit = '';
  @property() sub = '';
  @property({ type: Boolean }) warm = false;

  render() {
    return html`
      <section class="ha-card small glance">
        <div class="glance-row">
          <div class="icon-circle ${this.warm ? 'warm' : ''}"></div>
          <div style="flex:1">
            <div class="big">${this.value}<span class="unit">${this.unit}</span></div>
            <div class="sub">${this.sub}</div>
          </div>
        </div>
      </section>`;
  }
}
