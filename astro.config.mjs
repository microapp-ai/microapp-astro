import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// SSG (static) mode — all 126 tool pages pre-built at deploy time
export default defineConfig({
  site: "https://microapp.io",
  output: "static",
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
