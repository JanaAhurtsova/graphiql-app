import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: `${path.resolve(__dirname, 'src/components/')}`,
      pages: path.resolve(__dirname, 'src/pages'),
      public: `${path.resolve(__dirname, 'public/')}`,
      assets: `${path.resolve(__dirname, 'src/assets')}`,
      managers: `${path.resolve(__dirname, 'src/managers')}`,
      hooks: `${path.resolve(__dirname, 'src/hooks')}`,
      store: `${path.resolve(__dirname, 'src/store')}`,
    },
  },
});
