import { css } from 'lit';

// Ported from docs/tablet.html. Excluded: :root/*/html/body, .caption, .tablet frame,
// .bezel-camera, .screen, .topbar .clock, .topbar .date, .rail-foot (chrome / cut features).
// Two deliberate changes vs mock:
//   1. .zones-grid: grid-template-columns uses repeat(auto-fill, minmax(190px, 1fr)) instead of
//      repeat(3, 1fr); grid-template-rows declaration dropped — responsive grid per spec.
//   2. grid-column/grid-row placement removed from .topbar, .zones-foot, .rail — placement
//      provided by themo-tablet-view component.
export const tablet = css`
  /* ---------- Top bar ---------- */
  .topbar {
    height: 64px;
    padding: 0 28px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 28px;
    background: rgba(20,32,46,0.5);
  }
  .topbar .vbar { width: 1px; height: 28px; background: var(--border); }
  .topbar .glance {
    display: flex; align-items: center; gap: 18px;
  }
  .topbar .gl {
    display: flex; align-items: baseline; gap: 6px;
  }
  .topbar .gl .v {
    font-size: 18px;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em;
  }
  .topbar .gl .v .u { font-size: 11px; color: var(--muted); margin-left: 1px; }
  .topbar .gl .l {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .topbar .spacer { flex: 1; }
  .topbar .badge {
    display: inline-flex; align-items: center; gap: 8px;
    height: 32px; padding: 0 14px;
    border-radius: 999px;
    border: 1px solid rgba(255,112,67,0.4);
    background: var(--heat-soft);
    color: var(--heat);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .topbar .badge .dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--heat);
    box-shadow: 0 0 0 4px rgba(255,112,67,0.2);
    animation: pulse 1.6s infinite;
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,112,67,0.4); }
    50% { box-shadow: 0 0 0 7px rgba(255,112,67,0); }
  }

  /* ---------- Zones grid (left, big) ---------- */
  .zones-grid {
    padding: 24px 24px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 14px;
  }
  .ztile {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 18px 20px 18px;
    display: flex; flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    min-height: 0;
    transition: border-color .12s, background .12s;
  }
  .ztile:hover { border-color: var(--border-2); }
  .ztile.selected {
    border-color: var(--accent);
    background: linear-gradient(180deg, rgba(3,169,244,0.08), transparent 70%), var(--surface);
  }
  .ztile.heating {
    background: linear-gradient(180deg, rgba(255,112,67,0.1), transparent 60%), var(--surface);
  }
  .ztile.heating::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 16px;
    border: 1px solid rgba(255,112,67,0.4);
    pointer-events: none;
  }
  .ztile.off {
    background: rgba(255,255,255,0.02);
    color: var(--fg-soft);
  }

  .ztile .head {
    display: flex; align-items: flex-start;
    gap: 10px;
  }
  .ztile .head .name {
    font-size: 17px;
    font-weight: 500;
    letter-spacing: -0.005em;
    flex: 1;
  }
  .ztile .head .entity {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted-2);
    margin-top: 2px;
    letter-spacing: 0.02em;
  }
  .ztile .mp {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 4px 8px;
    border: 1px solid var(--border-2);
    border-radius: 6px;
    background: rgba(255,255,255,0.02);
  }
  .ztile.heating .mp { color: var(--heat); border-color: rgba(255,112,67,0.4); background: rgba(255,112,67,0.08); }
  .ztile.auto .mp { color: var(--accent); border-color: rgba(3,169,244,0.4); background: rgba(3,169,244,0.06); }
  .ztile .mp .sw { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

  .ztile .big-temp {
    display: flex; align-items: baseline;
    gap: 6px;
    margin: 12px 0 8px;
  }
  .ztile .big-temp .now {
    font-size: 64px;
    font-weight: 200;
    letter-spacing: -0.04em;
    line-height: 0.95;
  }
  .ztile.off .big-temp .now { color: var(--muted); font-weight: 200; }
  .ztile .big-temp .u {
    font-size: 24px; color: var(--muted); font-weight: 300;
  }
  .ztile .big-temp .delta {
    font-size: 13px;
    color: var(--ok);
    font-family: var(--font-mono);
    margin-left: 4px;
    letter-spacing: 0.02em;
  }
  .ztile .big-temp .delta.warn { color: var(--heat); }
  .ztile .big-temp .delta.cool { color: var(--accent); }

  .ztile .target-line {
    display: flex; align-items: center; gap: 8px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--fg-soft);
    letter-spacing: 0.03em;
  }
  .ztile .target-line .arrow { color: var(--muted); }
  .ztile .target-line .target { color: var(--fg); }
  .ztile .meta-line {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.02em;
    margin-top: 4px;
    height: 14px;
  }

  /* ---------- Right rail ---------- */
  .rail {
    background: var(--surface-2);
    border-left: 1px solid var(--border);
    display: flex; flex-direction: column;
    padding: 24px 22px;
    overflow: hidden;
    gap: 20px;
  }

  .focus-card {
    border: 1px solid var(--border);
    background: var(--surface);
    border-radius: 14px;
    padding: 18px;
  }
  .focus-card .label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 6px;
  }
  .focus-card .name {
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.01em;
    margin-bottom: 16px;
  }
  .focus-card .ring-wrap {
    display: grid; place-items: center;
    margin-bottom: 14px;
    position: relative;
  }
  .focus-card svg.ring { width: 180px; height: 180px; }
  .focus-card .ring-num {
    position: absolute; inset: 0;
    display: grid; place-items: center;
  }
  .focus-card .ring-num .big {
    font-size: 44px;
    font-weight: 200;
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .focus-card .ring-num .big .u { font-size: 16px; color: var(--muted); }
  .focus-card .ring-num .cap {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 4px;
  }
  .stepper {
    display: grid; grid-template-columns: 56px 1fr 56px;
    height: 60px;
    border-radius: 14px;
    border: 1px solid var(--border-2);
    background: var(--surface-2);
    overflow: hidden;
  }
  .stepper button {
    border: 0; background: transparent;
    color: var(--accent);
    font-size: 26px;
    line-height: 1;
    cursor: pointer;
    font-family: var(--font-sans);
  }
  .stepper .val {
    display: grid; place-items: center;
    font-family: var(--font-mono);
    font-size: 22px;
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
  }
  .stepper .val .u { font-size: 11px; color: var(--muted); margin-left: 2px; }

  .mode-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    margin-top: 12px;
  }
  .mode-tile {
    border: 1px solid var(--border-2);
    background: var(--surface-2);
    border-radius: 10px;
    padding: 10px 8px;
    display: flex; flex-direction: column; align-items: center;
    gap: 4px;
    cursor: pointer;
    color: var(--fg-soft);
  }
  .mode-tile.selected {
    background: rgba(255,112,67,0.12);
    border-color: rgba(255,112,67,0.5);
    color: var(--heat);
  }
  .mode-tile svg { width: 18px; height: 18px; }
  .mode-tile .name {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .qa-stack {
    display: flex; flex-direction: column; gap: 8px;
  }
  .qa-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .qa-row {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .qa-btn {
    background: var(--surface);
    border: 1px solid var(--border-2);
    border-radius: 12px;
    padding: 14px 12px;
    color: var(--fg-soft);
    text-align: left;
    cursor: pointer;
    display: flex; flex-direction: column; gap: 4px;
    font-family: inherit;
    transition: background .12s, color .12s, border-color .12s;
  }
  .qa-btn:hover {
    background: var(--surface-3);
    border-color: var(--accent);
    color: var(--fg);
  }
  .qa-btn.active {
    background: rgba(255,112,67,0.12);
    border-color: rgba(255,112,67,0.5);
    color: var(--heat);
  }
  .qa-btn .lbl-row {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 500;
  }
  .qa-btn .lbl-row svg { width: 16px; height: 16px; }
  .qa-btn .sub {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.06em;
  }
  .qa-btn.active .sub { color: rgba(255,112,67,0.7); }
  .qa-btn.wide { grid-column: 1 / -1; flex-direction: row; align-items: center; justify-content: space-between; }
  .qa-btn.wide .lbl-row { font-size: 12px; }

  /* Bottom strip on left side (daily heating) */
  .zones-foot {
    border-top: 1px solid var(--border);
    padding: 14px 24px;
    display: grid;
    grid-template-columns: 140px 1fr auto auto auto auto;
    gap: 20px;
    align-items: center;
  }
  .zones-foot .lbl {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .zones-foot .bar {
    height: 6px;
    border-radius: 999px;
    background: rgba(255,255,255,0.05);
    overflow: hidden;
    position: relative;
  }
  .zones-foot .bar::before {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(90deg, transparent 0, transparent 9.99%, var(--border) 9.99%, var(--border) 10%);
    pointer-events: none;
  }
  .zones-foot .fill {
    height: 100%;
    background: linear-gradient(90deg, var(--heat), #ffb74d);
    width: 38%;
    border-radius: 999px;
  }
  .zones-foot .stat {
    display: flex; flex-direction: column; align-items: flex-end;
    gap: 1px;
  }
  .zones-foot .stat .v {
    font-family: var(--font-mono);
    font-size: 15px;
    color: var(--fg);
    letter-spacing: -0.005em;
  }
  .zones-foot .stat .v .u { font-size: 10px; color: var(--muted); }
  .zones-foot .stat .l {
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
`;
