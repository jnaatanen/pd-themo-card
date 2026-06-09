import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const HA_WWW = process.env.THEMO_HA_WWW
  ?? 'C:/Projects/pd-hathemo/docker/config/www/themo-card';

export default defineConfig({
  build: {
    lib: { entry: resolve(__dirname, 'src/themo-card.ts'), formats: ['es'], fileName: () => 'themo-card.js' },
    rollupOptions: { output: { inlineDynamicImports: true } },
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [{
    name: 'copy-to-ha',
    closeBundle() {
      const built = resolve(__dirname, 'dist/themo-card.js');
      // HACS serves the bundle from the repo root (hacs.json `filename`), so keep a
      // committed copy there alongside the dist build.
      try {
        copyFileSync(built, resolve(__dirname, 'themo-card.js'));
        console.log('Copied themo-card.js -> repo root');
      } catch (e) { console.warn('Skipped repo-root copy:', (e as Error).message); }
      // Convenience: also drop it into the local Docker HA www for dev testing.
      try {
        mkdirSync(HA_WWW, { recursive: true });
        copyFileSync(built, resolve(HA_WWW, 'themo-card.js'));
        console.log(`Copied themo-card.js -> ${HA_WWW}`);
      } catch (e) { console.warn('Skipped HA www copy:', (e as Error).message); }
    },
  }],
});
