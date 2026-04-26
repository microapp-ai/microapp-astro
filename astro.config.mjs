import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

/**
 * OUTPUT STRATEGY
 * ───────────────
 * output: "server"  — Astro 5 removed the "hybrid" mode. In Astro 5,
 *                     "server" with `export const prerender = true` on each
 *                     page is the equivalent of the old "hybrid" mode.
 *
 * All existing tool pages export `prerender = true` (added in [slug].astro)
 * so they remain fully static (pre-rendered at build time).
 * ISR via Cloudflare KV will be wired in once the KV namespace is created
 * in the Cloudflare dashboard.
 */
export default defineConfig({
  site: "https://microapp.io",
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true, // makes Cloudflare bindings available in dev
    },
  }),
  integrations: [
    react(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "radix-vendor": [
              "@radix-ui/react-dialog",
              "@radix-ui/react-select",
              "@radix-ui/react-tabs",
              "@radix-ui/react-accordion",
              "@radix-ui/react-tooltip",
            ],
          },
        },
      },
    },
  },
});
