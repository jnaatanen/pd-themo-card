import { css } from 'lit';

// Ported verbatim from docs/desktop.html :root.
export const tokens = css`
  :host {
    --bg:#0f1722; --surface:#1a2433; --surface-2:#131d2a; --surface-3:#213044;
    --border:rgba(255,255,255,0.08); --border-2:rgba(255,255,255,0.14);
    --fg:#e8eef5; --fg-soft:#b6c3d2; --muted:#6a7a8f; --muted-2:#4a5b73;
    --accent:#03a9f4; --accent-2:#0288d1; --heat:#ff7043; --heat-soft:rgba(255,112,67,0.14);
    --cool:#4fc3f7; --ok:#66bb6a; --warn:#ffb74d; --danger:#ef5350;
    --font-sans:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',system-ui,sans-serif;
    --font-mono:'JetBrains Mono','IBM Plex Mono',ui-monospace,Menlo,monospace;
    display:block;
    color:var(--fg); font-family:var(--font-sans); font-size:14px; line-height:1.5;
    font-variant-numeric:tabular-nums;
  }
  * { box-sizing:border-box; }
`;
