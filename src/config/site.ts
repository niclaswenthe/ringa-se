// Sajtens sidregister – enda källan för navigation, startsidans vägvisare
// och /llms.txt (genereras vid build från denna lista, så den aldrig blir
// inaktuell). Ny sida = ny post här.

export const siteName = "Ringa.se";

// Konsekvent entitetsbeskrivning: samma formulering används på om-sidan,
// i JSON-LD och i llms.txt. [GEO-krav – ändra på alla ställen samtidigt]
export const siteDescription =
  "Sveriges begripligaste källa om att ringa och surfa utomlands – öppet finansierad med annonslänkar.";

export interface PageInfo {
  path: string;
  title: string;
  /** En rad som beskriver sidan i llms.txt och på startsidan. */
  description: string;
  section: "guider" | "verktyg" | "lander" | "ordlista" | "om";
}

export const sitePages: PageInfo[] = [
  {
    path: "/guider/ringa-utomlands/",
    title: "Ringa & surfa utomlands 2026 – stora guiden",
    description:
      "Pelarguiden: vad roaming kostar, vad som ingår i EU, och hur du väljer mellan operatörsroaming och eSIM.",
    section: "guider",
  },
  {
    path: "/guider/esim-for-nyborjare/",
    title: "eSIM för nybörjare",
    description:
      "Vad ett eSIM är, hur installationen går till steg för steg och vilka telefoner som stöds.",
    section: "guider",
  },
  {
    path: "/guider/roaming-utanfor-eu/",
    title: "Roaming utanför EU – så undviker du fällorna",
    description:
      "EU-reglerna i korthet och fällorna utanför EU: dyra dagspriser, fartygsnät och automatisk datauppkoppling.",
    section: "guider",
  },
  {
    path: "/guider/basta-abonnemang-resa/",
    title: "Bästa svenska abonnemanget för dig som reser",
    description:
      "Jämförelse av svenska mobiloperatörer ur resenärens perspektiv: EU-villkor, Storbritannien och eSIM-stöd.",
    section: "guider",
  },
  {
    path: "/verktyg/esim-kollare/",
    title: "Funkar eSIM i min telefon?",
    description:
      "Interaktiv kollare: välj telefonmärke och modell och få svar direkt på om din telefon stöder eSIM.",
    section: "verktyg",
  },
  {
    path: "/verktyg/roamingkalkylator/",
    title: "Roamingkalkylatorn – vad kostar min resa?",
    description:
      "Interaktiv kalkylator: välj land och surfbehov och få ett uppskattat kostnadsspann för roaming respektive eSIM.",
    section: "verktyg",
  },
  {
    path: "/ordlista/",
    title: "Ordlista – tekniken förklarad enkelt",
    description:
      "eSIM, roaming, APN, VoLTE, WiFi-samtal och andra begrepp förklarade på begriplig svenska.",
    section: "ordlista",
  },
  {
    path: "/lander/thailand/",
    title: "eSIM & ringa i Thailand",
    description:
      "Fungerar svenska abonnemang i Thailand, vad roaming kostar och varför eSIM oftast är bättre där.",
    section: "lander",
  },
  {
    path: "/lander/usa/",
    title: "eSIM & ringa i USA",
    description:
      "Fungerar svenska abonnemang i USA, vad roaming kostar och hur du surfar billigare med eSIM.",
    section: "lander",
  },
  {
    path: "/lander/turkiet/",
    title: "eSIM & ringa i Turkiet",
    description:
      "Turkiet ligger utanför EU:s roamingregler – det här kostar det och så slipper du chockfakturan.",
    section: "lander",
  },
  {
    path: "/lander/storbritannien/",
    title: "eSIM & ringa i Storbritannien",
    description:
      "Efter Brexit gör svenska operatörer olika i Storbritannien – kolla vad som gäller för just din operatör.",
    section: "lander",
  },
  {
    path: "/om/",
    title: "Om Ringa.se",
    description: "Vem som står bakom Ringa.se och hur du kontaktar oss.",
    section: "om",
  },
  {
    path: "/om/sa-tjanar-vi-pengar/",
    title: "Så tjänar Ringa.se pengar",
    description:
      "Öppen förklaring av affiliatemodellen: vilka nätverk vi samarbetar med och hur omdömen hålls oberoende.",
    section: "om",
  },
  {
    path: "/om/integritet-cookies/",
    title: "Integritet & cookies",
    description:
      "Ringa.se sätter inga cookies och samlar inte in personuppgifter – här står vad som gäller.",
    section: "om",
  },
];
