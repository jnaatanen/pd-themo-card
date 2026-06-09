import { css } from 'lit';

export const shared = css`
  /* ----------- HA card primitives ----------- */
  .ha-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
  }
  .ha-card.small { padding: 16px; }
  .ha-card .card-head {
    padding: 18px 22px 14px;
    display: flex; align-items: center; gap: 14px;
    border-bottom: 1px solid var(--border);
  }
  .ha-card .card-head .h-title {
    font-size: 15px; font-weight: 500; letter-spacing: -0.005em;
  }
  .ha-card .card-head .h-sub {
    color: var(--muted); font-size: 12px;
  }
  .ha-card .card-head .spacer { flex: 1; }

  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    height: 24px; padding: 0 10px;
    border-radius: 999px;
    background: var(--surface-3);
    border: 1px solid var(--border);
    color: var(--fg-soft);
    font-size: 11px; letter-spacing: 0.04em;
    font-family: var(--font-mono);
    text-transform: uppercase;
  }
  .pill .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--muted); }
  .pill.heat { color: var(--heat); background: var(--heat-soft); border-color: rgba(255,112,67,0.3); }
  .pill.heat .dot { background: var(--heat); box-shadow: 0 0 0 4px rgba(255,112,67,0.18); animation: pulse 1.6s ease-in-out infinite; }
  .pill.ok { color: var(--ok); }
  .pill.cool { color: var(--cool); }
  .pill.outside { color: var(--fg-soft); }
  .pill.outside .dot { background: var(--cool); }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,112,67,0.4); }
    50% { box-shadow: 0 0 0 6px rgba(255,112,67,0); }
  }

  /* ----------- Themo card overview ----------- */
  .themo-overview .strip {
    padding: 14px 22px;
    display: flex; gap: 18px;
    border-bottom: 1px solid var(--border);
    background: var(--surface-2);
    align-items: center;
  }
  .strip .stat {
    display: flex; flex-direction: column;
    border-right: 1px solid var(--border);
    padding-right: 18px;
    min-width: 0;
  }
  .strip .stat:last-of-type { border-right: 0; }
  .strip .stat .label {
    font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--muted); font-family: var(--font-mono);
    margin-bottom: 4px;
  }
  .strip .stat .val {
    font-size: 18px; color: var(--fg);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em;
  }
  .strip .stat .val .unit { font-size: 12px; color: var(--muted); margin-left: 2px; }
  .strip .stat .val .delta { font-size: 11px; color: var(--ok); margin-left: 8px; font-family: var(--font-mono); }

  .zones {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
  }
  .zone {
    background: var(--surface);
    padding: 18px 18px 16px;
    cursor: pointer;
    transition: background .12s;
    position: relative;
  }
  .zone:hover { background: #1d2839; }
  .zone.active-detail {
    background: linear-gradient(180deg, rgba(3,169,244,0.06), transparent 60%);
    box-shadow: inset 2px 0 0 var(--accent);
  }
  .zone.heating::after {
    content: '';
    position: absolute;
    inset: auto 0 0 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--heat), transparent);
    opacity: 0.7;
    animation: heatline 2.2s ease-in-out infinite;
  }
  @keyframes heatline {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.9; }
  }

  .zone-head {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 12px;
  }
  .zone-name { font-size: 13px; font-weight: 500; letter-spacing: -0.005em; flex: 1; }
  .zone-entity {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted-2);
    margin-top: 2px;
  }
  .zone-temp {
    display: flex; align-items: baseline; gap: 8px;
    margin-bottom: 8px;
  }
  .zone-temp .now {
    font-size: 32px;
    font-weight: 300;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }
  .zone-temp .now .unit {
    font-size: 14px; color: var(--muted); font-weight: 400; margin-left: 2px;
  }
  .zone-temp .target {
    font-size: 12px;
    color: var(--fg-soft);
    font-family: var(--font-mono);
    letter-spacing: 0.02em;
  }
  .zone-temp .target .arrow { color: var(--muted); margin: 0 4px; }
  .zone-meta {
    display: flex; align-items: center; gap: 8px;
    color: var(--muted); font-size: 11px;
    font-family: var(--font-mono); letter-spacing: 0.03em;
    margin-bottom: 12px; min-height: 14px;
  }
  .zone-meta .sep { color: var(--muted-2); }
  .zone-foot {
    display: flex; align-items: center; gap: 6px;
  }
  .mode-pill {
    height: 22px; padding: 0 10px;
    border-radius: 999px;
    border: 1px solid var(--border-2);
    background: transparent;
    color: var(--fg-soft);
    font-size: 10px; letter-spacing: 0.12em;
    font-family: var(--font-mono);
    text-transform: uppercase;
    cursor: pointer;
    display: inline-flex; align-items: center; gap: 5px;
  }
  .mode-pill .swatch { width: 6px; height: 6px; border-radius: 50%; background: var(--muted); }
  .mode-pill.heat { color: var(--heat); border-color: rgba(255,112,67,0.45); }
  .mode-pill.heat .swatch { background: var(--heat); }
  .mode-pill.auto { color: var(--accent); border-color: rgba(3,169,244,0.4); }
  .mode-pill.auto .swatch { background: var(--accent); }
  .mode-pill.off { color: var(--muted); }

  .quick-actions {
    padding: 16px 22px;
    border-top: 1px solid var(--border);
    background: var(--surface-2);
    display: flex; align-items: center; gap: 10px;
    flex-wrap: wrap;
  }
  .qa-label {
    font-size: 10px; color: var(--muted);
    letter-spacing: 0.16em; text-transform: uppercase;
    font-family: var(--font-mono);
    margin-right: 6px;
  }
  .qa-chip {
    height: 32px; padding: 0 14px;
    border-radius: 999px;
    background: var(--surface-3);
    border: 1px solid var(--border-2);
    color: var(--fg-soft);
    font-size: 12px;
    cursor: pointer;
    display: inline-flex; align-items: center; gap: 7px;
    font-family: inherit;
    transition: background .12s, color .12s, border-color .12s;
  }
  .qa-chip:hover { background: #28354b; color: var(--fg); border-color: var(--accent); }
  .qa-chip.active { background: rgba(255,112,67,0.16); color: var(--heat); border-color: rgba(255,112,67,0.5); }
  .qa-chip .svg-ic { width: 14px; height: 14px; opacity: 0.85; }
  .qa-chip .kbd {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 1px 4px;
    background: rgba(0,0,0,0.2);
  }

  .daily-bar {
    padding: 16px 22px;
    border-top: 1px solid var(--border);
    display: grid; grid-template-columns: 130px 1fr 64px;
    gap: 16px;
    align-items: center;
  }
  .daily-bar .lbl {
    font-size: 10px; color: var(--muted);
    letter-spacing: 0.14em; text-transform: uppercase;
    font-family: var(--font-mono);
  }
  .daily-bar .bar {
    height: 6px; border-radius: 999px;
    background: var(--surface-2);
    overflow: hidden;
    position: relative;
  }
  .daily-bar .bar::before {
    content: ''; position: absolute; inset: 0;
    background: repeating-linear-gradient(90deg, transparent 0, transparent 9.99%, var(--border) 9.99%, var(--border) 10%);
    pointer-events: none;
  }
  .daily-bar .fill {
    height: 100%;
    background: linear-gradient(90deg, var(--heat), #ffb74d);
    width: 38%;
    border-radius: 999px;
  }
  .daily-bar .pct {
    text-align: right;
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--fg);
    letter-spacing: 0.02em;
  }
  .daily-bar .pct .small { color: var(--muted); font-size: 10px; }

  /* ----------- Detail card (right column) ----------- */
  .detail-head {
    padding: 22px 24px 18px;
    border-bottom: 1px solid var(--border);
  }
  .detail-eyebrow {
    color: var(--muted); font-size: 10px;
    letter-spacing: 0.16em; text-transform: uppercase;
    font-family: var(--font-mono);
    margin-bottom: 6px;
  }
  .detail-title {
    font-size: 22px; letter-spacing: -0.015em;
    font-weight: 500;
    margin-bottom: 4px;
  }
  .detail-entity {
    font-family: var(--font-mono);
    font-size: 11px; color: var(--muted);
    letter-spacing: 0.02em;
  }

  .ring-stage {
    padding: 28px 24px 8px;
    display: grid; grid-template-columns: 220px 1fr;
    gap: 22px;
    align-items: center;
  }
  .ring {
    position: relative; width: 220px; height: 220px;
    display: grid; place-items: center;
  }
  .ring svg { width: 100%; height: 100%; }
  .ring .ring-num {
    position: absolute;
    inset: 0;
    display: grid; place-items: center;
    text-align: center;
  }
  .ring .now-big {
    font-size: 60px;
    font-weight: 200;
    letter-spacing: -0.04em;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .ring .now-big .unit { font-size: 22px; color: var(--muted); margin-left: 2px; font-weight: 300; }
  .ring .now-cap {
    font-family: var(--font-mono);
    font-size: 10px; letter-spacing: 0.18em;
    color: var(--muted); text-transform: uppercase;
    margin-top: 8px;
  }
  .target-col { display: flex; flex-direction: column; gap: 14px; }
  .target-col .label {
    font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--muted);
  }
  .stepper {
    display: grid; grid-template-columns: 44px 1fr 44px;
    height: 56px;
    border-radius: 12px;
    border: 1px solid var(--border-2);
    overflow: hidden;
    background: var(--surface-2);
  }
  .stepper button {
    border: 0; background: transparent;
    color: var(--fg-soft);
    font-size: 22px; line-height: 1;
    cursor: pointer;
    font-family: var(--font-sans);
    transition: background .12s, color .12s;
  }
  .stepper button:hover { background: rgba(3,169,244,0.1); color: var(--accent); }
  .stepper .val {
    display: grid; place-items: center;
    font-family: var(--font-mono);
    font-size: 24px;
    letter-spacing: 0.01em;
    color: var(--fg);
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
  }
  .stepper .val .unit {
    font-size: 12px; color: var(--muted); margin-left: 2px;
  }

  .mode-row {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 0 24px;
    margin-top: 18px;
  }
  .mode-tile {
    border: 1px solid var(--border-2);
    background: var(--surface-2);
    border-radius: 12px;
    padding: 14px 12px;
    display: flex; flex-direction: column;
    align-items: flex-start; gap: 8px;
    cursor: pointer;
    transition: border-color .12s, background .12s;
    color: var(--fg-soft);
  }
  .mode-tile:hover { border-color: var(--accent); }
  .mode-tile.selected {
    border-color: var(--heat);
    background: linear-gradient(180deg, rgba(255,112,67,0.1), transparent 80%);
    color: var(--fg);
  }
  .mode-tile .ic { width: 22px; height: 22px; }
  .mode-tile .name { font-size: 13px; font-weight: 500; }
  .mode-tile .desc { font-size: 11px; color: var(--muted); }
  .mode-tile.selected .desc { color: var(--fg-soft); }

  .detail-grid {
    padding: 22px 24px;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .kv {
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    background: var(--surface-2);
  }
  .kv .k {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .kv .v {
    font-size: 16px; color: var(--fg);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.005em;
  }
  .kv .v .unit { font-size: 11px; color: var(--muted); margin-left: 2px; }
  .kv .sub { font-size: 11px; color: var(--muted); margin-top: 2px; }

  .schedule {
    padding: 22px 24px;
    border-top: 1px solid var(--border);
  }
  .schedule-head {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 14px;
  }
  .schedule-head .title { font-size: 13px; font-weight: 500; }
  .schedule-head .next {
    margin-left: auto;
    font-family: var(--font-mono); font-size: 11px;
    color: var(--muted); letter-spacing: 0.04em;
  }
  .schedule-head .next strong { color: var(--accent); font-weight: 500; }
  .heatmap {
    display: grid; grid-template-columns: 36px 1fr;
    gap: 6px;
    align-items: center;
  }
  .heatmap .hour-row {
    display: grid; grid-template-columns: repeat(24, 1fr);
    gap: 2px;
    height: 18px;
  }
  .heatmap .hour-row .cell {
    border-radius: 2px;
    background: rgba(255,255,255,0.05);
  }
  .heatmap .hour-row .cell[data-h="1"] { background: rgba(255,112,67,0.25); }
  .heatmap .hour-row .cell[data-h="2"] { background: rgba(255,112,67,0.5); }
  .heatmap .hour-row .cell[data-h="3"] { background: rgba(255,112,67,0.78); }
  .heatmap .hour-row .cell[data-now] { box-shadow: inset 0 0 0 1.5px var(--accent); }
  .heatmap .row-lbl {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--muted); letter-spacing: 0.04em;
    text-align: right;
  }
  .hour-axis {
    grid-column: 2;
    display: grid; grid-template-columns: repeat(24, 1fr);
    gap: 2px;
    margin-top: 4px;
    font-family: var(--font-mono);
    font-size: 9px; color: var(--muted-2);
    letter-spacing: 0.02em;
  }
  .hour-axis span { text-align: center; }
  .hour-axis span:not(:nth-child(6n+1)) { visibility: hidden; }

  /* ----------- Side cards (right column extras) ----------- */
  .right-col { display: flex; flex-direction: column; gap: 18px; }

  .glance .glance-row {
    display: flex; align-items: center; gap: 14px;
  }
  .glance .icon-circle {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: grid; place-items: center;
    background: rgba(3,169,244,0.12);
    color: var(--accent);
  }
  .glance .icon-circle.warm { background: rgba(255,112,67,0.14); color: var(--heat); }
  .glance .glance-row .big {
    font-size: 22px; font-weight: 300;
    letter-spacing: -0.015em;
    font-variant-numeric: tabular-nums;
  }
  .glance .glance-row .big .unit { font-size: 12px; color: var(--muted); }
  .glance .glance-row .sub { font-size: 11px; color: var(--muted); font-family: var(--font-mono); letter-spacing: 0.02em; }

  .legend {
    padding: 12px 18px;
    display: flex; gap: 16px;
    border-top: 1px solid var(--border);
    background: var(--surface-2);
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .legend .li { display: inline-flex; align-items: center; gap: 6px; }
  .legend .sw { width: 10px; height: 10px; border-radius: 3px; }

  /* ----------- Misc ----------- */
  a { color: inherit; text-decoration: none; }
  ::selection { background: rgba(3,169,244,0.3); color: var(--fg); }
`;
