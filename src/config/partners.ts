// Central konfig för alla utgående affiliatelänkar. [KRAV]
// Ändras spårningslänkarna görs det HÄR – på ett ställe.
// Denna fil får inte ändras av agentpipelinen.

export interface Partner {
  /** Utlänkens mål. Spårningslänk när tracking = true, annars partnerns publika sajt. */
  url: string;
  /** Namn som visas på knappen. */
  label: string;
  /** Affiliatenätverk som förmedlar provisionen. */
  network: "Adtraction" | "Impact" | "TBD";
  /** True när riktig spårningslänk är inlagd. */
  tracking: boolean;
  /**
   * Destinationsspecifika spårningslänkar (djuplänkar). Nyckeln anges i
   * AffiliateButton via prop `mal`. Saknas nyckeln används `url`.
   * Varje länk skapas i nätverkets gränssnitt mot en landningssida hos
   * partnern och landar därmed direkt rätt i stället för på startsidan.
   */
  deepLinks?: Record<string, string>;
}

export const partners = {
  airalo: {
    url: "https://airalo.pxf.io/vDgRVe",
    label: "Airalo",
    network: "Impact",
    tracking: true,
    deepLinks: {
      // → https://www.airalo.com/sv-SE/<land>-esim
      thailand: "https://airalo.pxf.io/AgYJj1",
      usa: "https://airalo.pxf.io/zzDL4M",
      turkiet: "https://airalo.pxf.io/n4e0y7",
      storbritannien: "https://airalo.pxf.io/OYL2bN",
    },
  },
  tre: {
    url: "https://at.tre.se/t/t?a=1243479444&as=2105825431&t=2&tk=1",
    label: "Tre",
    network: "Adtraction",
    tracking: true,
    deepLinks: {
      // Adtraction djuplänkar via &url=<urlencodad destination>.
      "3varlden":
        "https://at.tre.se/t/t?a=1243479444&as=2105825431&t=2&tk=1&url=https%3A%2F%2Fwww.tre.se%2Fhandla%2Ftjanster%2F3varlden",
    },
  },
  // TODO: Ersätt url med riktiga spårningslänkar när Adtraction godkänt
  // programmen, och sätt tracking: true.
  hallon: { url: "https://www.hallon.se", label: "Hallon", network: "Adtraction", tracking: false },
  vimla: {
    url: "https://on.vimla.se/t/t?a=1081333617&as=2105825431&t=2&tk=1",
    label: "Vimla",
    network: "Adtraction",
    tracking: true,
    deepLinks: {
      // Vimla pekar själva ut /bestall som sidan med aktuella priser.
      bestall:
        "https://on.vimla.se/t/t?a=1081333617&as=2105825431&t=2&tk=1&url=https%3A%2F%2Fvimla.se%2Fbestall%2F",
    },
  },
  comviq: { url: "https://www.comviq.se", label: "Comviq", network: "Adtraction", tracking: false },
  saily: { url: "https://saily.com/sv", label: "Saily", network: "TBD", tracking: false },
} satisfies Record<string, Partner>;

export type PartnerKey = keyof typeof partners;

/** Väljer djuplänk om den finns, annars partnerns standardlänk. */
export function affiliateUrl(partner: PartnerKey, mal?: string): string {
  const p: Partner = partners[partner];
  if (mal && p.deepLinks && p.deepLinks[mal]) {
    return p.deepLinks[mal];
  }
  return p.url;
}
