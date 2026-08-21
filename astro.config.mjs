// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Statisk sajt utan klient-JS som standard. Inga externa skript får läggas
// till här – cookiefriheten (LEK 9 kap. 28 §) förutsätter det. Se BYGGSPEC.md.
export default defineConfig({
  site: "https://ringa.se",
  trailingSlash: "always",
  integrations: [sitemap()],
});
