import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/agil-projekt-pluggpolarna-pages/', // Viktigt för GitHub Pages
  plugins: [vue()],
});
