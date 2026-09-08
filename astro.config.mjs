// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ⬜ Pendiente: reemplazar por el dominio real en la Fase 10 (Deploy) — el de
// Netlify si no hay dominio propio, o terrastudio.cl si lo compran. Sitemap,
// canónicas y Open Graph se generan a partir de este valor.
const SITIO = 'https://terra-studio.netlify.app';

// https://astro.build/config
export default defineConfig({
  site: SITIO,
  integrations: [sitemap()],
});
