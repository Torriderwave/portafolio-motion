import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://torriderwave.github.io',
  base: '/portafolio-motion',
  vite: { plugins: [tailwindcss()] },
});
