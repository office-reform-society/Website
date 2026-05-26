import { defineConfig } from 'vite';
import path from 'node:path';

// Multi-page Vite build. index.html stays the marketing landing,
// terms.html and privacy.html ship as standalone legal pages linked
// from the mobile app's signup screen. GitHub Pages serves them
// at /terms.html and /privacy.html; the postbuild script in
// package.json also drops /terms/index.html and /privacy/index.html
// so the bare /terms and /privacy URLs (which the mobile app uses)
// resolve cleanly.
export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        terms: path.resolve(__dirname, 'terms.html'),
        privacy: path.resolve(__dirname, 'privacy.html'),
      },
    },
  },
  server: {
    port: 5175,
    open: true,
  },
});
