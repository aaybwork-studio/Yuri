import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'assets',
    emptyOutDir: false, // Do not delete default Dawn assets
    minify: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'frontend/entry.js'),
      },
      output: {
        entryFileNames: 'yuri-scripts.js',
        assetFileNames: (assetInfo) => {
          // Check if it is a CSS asset
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'yuri-styles.[ext]';
          }
          return '[name].[ext]';
        },
        chunkFileNames: '[name].js',
      },
    },
  },
});
