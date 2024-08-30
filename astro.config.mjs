import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

//* SSR Adapter de NodeJS 
// import node from "@astrojs/node";
import cloudflare from "@astrojs/cloudflare";
import db from "@astrojs/db";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), db(), vue()],
  output: "hybrid",
  adapter: cloudflare(),
  //* Habilita Server actions 
  experimental: {
    actions: true
  }
  /* output: "hybrid",
  adapter: node({
    mode: "standalone"
  }) */
});