import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { resolve } from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  base: '/vecipormosquera/', // 👈 Va aquí, al mismo nivel que plugins
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      buffer: resolve(__dirname, 'node_modules/buffer/index.js'),
    },
  },
  define: {
    global: 'globalThis',
  },
});