// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitio en producción (Netlify). Si más adelante compran un dominio propio,
// actualizar acá — de este valor salen el sitemap, las canónicas y Open Graph.
const SITIO = 'https://terrastudiosalon.netlify.app';

// https://astro.build/config
export default defineConfig({
  site: SITIO,
  integrations: [sitemap()],
});
