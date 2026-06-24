import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/guia/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Split framework/vendor so first paint downloads less JS up front (#64).
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router') || id.includes('vue-i18n')) {
            return 'vue-vendor';
          }
          if (id.includes('daisyui') || id.includes('tailwind')) {
            return 'ui-vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    allowedHosts: ['sovereinia.org'],
  },
});
