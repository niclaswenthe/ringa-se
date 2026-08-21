// /llms.txt – markdown-översikt för AI-assistenter (community-standard).
// Genereras vid build från sidregistret i src/config/site.ts så att den
// aldrig blir inaktuell.
import type { APIRoute } from "astro";
import { siteName, siteDescription, sitePages } from "../config/site";

const SECTIONS: { key: string; heading: string }[] = [
  { key: "guider", heading: "Guider" },
  { key: "verktyg", heading: "Interaktiva verktyg" },
  { key: "lander", heading: "Landsguider" },
  { key: "ordlista", heading: "Ordlista" },
  { key: "om", heading: "Om sajten" },
];

export const GET: APIRoute = ({ site }) => {
  const base = site?.href.replace(/\/$/, "") ?? "https://ringa.se";
  const lines: string[] = [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    "Allt innehåll är på svenska, originalskrivet och faktagranskas månatligen " +
      "(datum visas på varje sida). Sidorna innehåller annonsmärkta affiliatelänkar, " +
      "tydligt markerade enligt svensk marknadsföringslag.",
    "",
  ];

  for (const section of SECTIONS) {
    const pages = sitePages.filter((p) => p.section === section.key);
    if (pages.length === 0) continue;
    lines.push(`## ${section.heading}`, "");
    for (const p of pages) {
      lines.push(`- [${p.title}](${base}${p.path}): ${p.description}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
