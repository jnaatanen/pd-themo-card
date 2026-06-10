import { css } from 'lit';

// Ported from docs/phone.html. Excluded: .iphone/.screen/.island/.status-bar/.app-bar/
// .content/.ha-bottom-nav/.home-ind/.col/.caption (mock + HA app chrome).
// Also excluded: :root, *, html, body (mock page resets).
// Two positioning changes vs mock: .sheet-backdrop and .sheet use position: fixed
// (not absolute) so they overlay the viewport rather than the mock phone frame.
export const mobile = css`
  /* Header card */
  .head-card {
    background: linear-gradient(180deg, rgba(255,112,67,0.16), transparent 80%), var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 18px 18px 20px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  }
  .head-card .row {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 14px;
  }
  .head-card .badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--font-mono);
    font-size: 10px; letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--heat);
  }
  .head-card .badge .dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--heat);
    box-shadow: 0 0 0 4px rgba(255,112,67,0.2);
    animation: pulse 1.6s infinite;
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,112,67,0.4); }
    50% { box-shadow: 0 0 0 6px rgba(255,112,67,0); }
  }
  .head-card .outside {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--fg-soft);
    letter-spacing: 0.03em;
  }
  .head-card .big-temp {
    display: flex; align-items: baseline; gap: 14px;
    margin-bottom: 6px;
  }
  .head-card .big-temp .now {
    font-size: 56px;
    font-weight: 200;
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .head-card .big-temp .unit {
    font-size: 22px;
    color: var(--muted);
    font-weight: 300;
  }
  .head-card .big-temp .delta {
    font-size: 13px;
    color: var(--ok);
    font-family: var(--font-mono);
    letter-spacing: 0.02em;
  }
  .head-card .sub {
    font-size: 12px; color: var(--fg-soft);
  }
  .head-card .breakdown {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 10px; margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid var(--border);
  }
  .head-card .breakdown .b {
    display: flex; flex-direction: column; gap: 2px;
  }
  .head-card .breakdown .k {
    font-size: 10px; color: var(--muted);
    font-family: var(--font-mono);
    letter-spacing: 0.12em; text-transform: uppercase;
  }
  .head-card .breakdown .v {
    font-size: 15px; color: var(--fg);
    letter-spacing: -0.005em;
  }
  .head-card .breakdown .v .small { font-size: 11px; color: var(--muted); }

  /* Quick chips */
  .chips-scroll {
    display: flex; gap: 8px;
    overflow-x: auto;
    margin-bottom: 18px;
    padding-bottom: 4px;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .chips-scroll::-webkit-scrollbar { display: none; }
  .chip {
    flex-shrink: 0;
    height: 38px;
    padding: 0 14px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--border-2);
    color: var(--fg-soft);
    font-size: 13px;
    font-family: inherit;
    display: inline-flex; align-items: center; gap: 7px;
    cursor: pointer;
  }
  .chip.active {
    background: rgba(255,112,67,0.16);
    border-color: rgba(255,112,67,0.5);
    color: var(--heat);
  }
  .chip svg { width: 15px; height: 15px; }

  /* Zone list */
  .section-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 6px 4px 10px;
    display: flex; justify-content: space-between;
  }
  .section-label .count {
    color: var(--fg-soft);
  }
  .zlist {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }
  .zrow {
    padding: 14px 16px;
    display: grid;
    grid-template-columns: 36px 1fr auto auto;
    gap: 12px;
    align-items: center;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    position: relative;
  }
  .zrow:last-child { border-bottom: 0; }
  .zrow:active { background: var(--surface-2); }
  .zrow .ic {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(3,169,244,0.1);
    color: var(--accent);
    display: grid; place-items: center;
  }
  .zrow.heating .ic {
    background: rgba(255,112,67,0.14);
    color: var(--heat);
  }
  .zrow.off .ic {
    background: rgba(255,255,255,0.05);
    color: var(--muted);
  }
  .zrow .ic svg { width: 18px; height: 18px; }
  .zrow .name { font-size: 14px; font-weight: 500; }
  .zrow .meta {
    font-size: 11px; color: var(--muted);
    font-family: var(--font-mono);
    letter-spacing: 0.02em;
    margin-top: 1px;
  }
  .zrow .now {
    font-size: 20px;
    font-weight: 400;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .zrow .now .u { font-size: 12px; color: var(--muted); }
  .zrow .now .tgt {
    display: block;
    font-size: 10px;
    color: var(--muted);
    font-family: var(--font-mono);
    letter-spacing: 0.04em;
    margin-top: 2px;
    text-align: right;
  }
  .zrow .mp {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--muted);
  }
  .zrow.heating .mp { background: var(--heat); box-shadow: 0 0 0 4px rgba(255,112,67,0.16); }
  .zrow.auto .mp { background: var(--accent); }
  .zrow.off .mp { background: var(--muted-2); }

  /* Daily heating mini */
  .mini-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 14px 16px;
    margin-top: 16px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    align-items: center;
  }
  .mini-card .ic-circle {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(255,112,67,0.14);
    color: var(--heat);
    display: grid; place-items: center;
    grid-row: 1 / span 2;
  }
  .mini-card .ml { display: flex; flex-direction: column; gap: 2px; padding-left: 0; }
  .mini-card .label { font-size: 12px; color: var(--fg-soft); }
  .mini-card .bar {
    height: 5px; border-radius: 999px;
    background: var(--surface-2);
    overflow: hidden;
    margin-top: 8px;
  }
  .mini-card .fill {
    height: 100%;
    background: linear-gradient(90deg, var(--heat), #ffb74d);
    width: 38%;
    border-radius: 999px;
  }
  .mini-card .pct { font-family: var(--font-mono); font-size: 20px; letter-spacing: -0.01em; }
  .mini-card .pct .small { font-size: 11px; color: var(--muted); }

  /* ----------- Zone detail sheet ----------- */
  /* Backdrop dim — position: fixed so it overlays the viewport (not the mock phone frame) */
  .sheet-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    z-index: 30;
  }
  /* Sheet — position: fixed so it anchors to the viewport bottom */
  .sheet {
    position: fixed;
    left: 0; right: 0; bottom: 0;
    background: var(--surface);
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
    padding: 14px 18px 28px;
    z-index: 40;
    box-shadow: 0 -20px 40px rgba(0,0,0,0.4);
  }
  .sheet .grabber {
    width: 38px; height: 5px;
    background: rgba(255,255,255,0.25);
    border-radius: 999px;
    margin: 0 auto 12px;
  }
  .sheet .head {
    display: flex; align-items: baseline; gap: 10px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 16px;
  }
  .sheet .head .name { font-size: 20px; font-weight: 500; letter-spacing: -0.01em; }
  .sheet .head .entity {
    margin-left: auto;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.02em;
  }
  .sheet .dial-row {
    display: grid; grid-template-columns: 130px 1fr;
    gap: 16px; align-items: center;
    margin-bottom: 16px;
  }
  .mini-ring {
    position: relative; width: 130px; height: 130px;
    display: grid; place-items: center;
  }
  .mini-ring svg { width: 100%; height: 100%; }
  .mini-ring .num {
    position: absolute; inset: 0;
    display: grid; place-items: center;
  }
  .mini-ring .num .big {
    font-size: 32px;
    font-weight: 200;
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .mini-ring .num .big .u { font-size: 12px; color: var(--muted); }
  .mini-ring .num .lbl {
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--muted);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-top: 6px;
  }
  .sheet .target-stack {
    display: flex; flex-direction: column; gap: 10px;
  }
  .sheet .target-stack .lbl {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .sheet .stepper {
    display: grid; grid-template-columns: 48px 1fr 48px;
    height: 56px;
    border-radius: 16px;
    border: 1px solid var(--border-2);
    overflow: hidden;
    background: var(--surface-2);
  }
  .sheet .stepper button {
    border: 0; background: transparent;
    color: var(--accent);
    font-size: 26px; line-height: 1;
    cursor: pointer;
  }
  .sheet .stepper .val {
    display: grid; place-items: center;
    font-family: var(--font-mono);
    font-size: 22px;
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
  }
  .sheet .stepper .val .u { font-size: 11px; color: var(--muted); margin-left: 2px; }
  .sheet .mode-row {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }
  .sheet .mode-tile {
    border: 1px solid var(--border-2);
    background: var(--surface-2);
    border-radius: 14px;
    padding: 14px 10px;
    display: flex; flex-direction: column; align-items: center;
    gap: 6px;
    cursor: pointer;
    color: var(--fg-soft);
    text-align: center;
  }
  .sheet .mode-tile.selected {
    background: rgba(255,112,67,0.12);
    border-color: rgba(255,112,67,0.5);
    color: var(--heat);
  }
  .sheet .mode-tile.selected.auto {
    background: rgba(3,169,244,0.12);
    border-color: rgba(3,169,244,0.5);
    color: var(--accent);
  }
  .sheet .mode-tile .name {
    font-size: 12px; font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-family: var(--font-mono);
  }
  .sheet .mode-tile svg { width: 22px; height: 22px; }
  .sheet .kvs {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .sheet .kv {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px 12px;
  }
  .sheet .kv .k {
    font-family: var(--font-mono);
    font-size: 10px; color: var(--muted);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .sheet .kv .v {
    font-size: 14px;
    font-variant-numeric: tabular-nums;
  }
  .sheet .kv .v.heat { color: var(--heat); }
  .sheet .kv .v.accent { color: var(--accent); }

  /* Sheet slide-up entrance animation (not in mock — sheets pop in there) */
  @keyframes sheet-up { from { transform: translateY(24px); opacity: 0.6; } to { transform: none; opacity: 1; } }
  .sheet { animation: sheet-up .18s ease-out; }
`;
