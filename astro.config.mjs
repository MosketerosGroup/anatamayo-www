// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import relativeLinks from "astro-relative-links";

// https://docs.astro.build/en/guides/integrations-guide/sitemap/
import sitemap from '@astrojs/sitemap';

// https://www.npmjs.com/package/astro-devtool-breakpoints
import devtoolBreakpoints from 'astro-devtool-breakpoints';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    relativeLinks(),
    devtoolBreakpoints(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    assets: '_assets'
  },

  experimental: {
    responsiveImages: true,
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en'],
  },

  site: "https://anatamayo.com"
});
