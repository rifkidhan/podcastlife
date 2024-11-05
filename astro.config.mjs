import solidJs from "@astrojs/solid-js";
import { defineConfig, envField, passthroughImageService } from "astro/config";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import cloudflare from "@astrojs/cloudflare";

const ORIGIN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4321"
    : "https://podcastlife.pages.dev";

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site: ORIGIN,
  integrations: [solidJs()],
  output: "server",
  adapter: cloudflare({
    imageService: "passthrough",
    platformProxy: {
      enabled: true,
    },
  }),
  vite: {
    css: {
      transformer: "lightningcss",
      lightningcss: {
        targets: browserslistToTargets(browserslist([">0.25%", "not dead"])),
      },
    },
    build: {
      cssMinify: "lightningcss",
    },
  },
  scopedStyleStrategy: "where",
  prefetch: {
    defaultStrategy: "tap",
  },
  image: {
    service: passthroughImageService(),
  },
  redirects: {
    "/podcast": {
      status: 308,
      destination: "/categories",
    },
  },
  experimental: {
    env: {
      schema: {
        API_URL: envField.string({ context: "server", access: "secret" }),
        API_TOKEN: envField.string({ context: "server", access: "secret" }),
        ORIGIN: envField.string({ context: "client", access: "public" }),
      },
    },
    serverIslands: true,
  },
});
