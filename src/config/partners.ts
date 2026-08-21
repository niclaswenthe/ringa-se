// Central konfig för alla utgående affiliatelänkar. [KRAV]
// Innan nätverksgodkännande pekar länkarna på partnerns vanliga webbplats
// (ej spårningslänk). När spårningslänkarna kommer byts de HÄR – på ett ställe.
// TODO: Ersätt url-värdena med riktiga spårningslänkar när Adtraction/Impact
// har godkänt ansökningarna. Denna fil får inte ändras av agentpipelinen.

export interface Partner {
  /** Utlänkens mål. Platshållare = partnerns publika sajt tills godkännande. */
  url: string;
  /** Namn som visas på knappen. */
  label: string;
  /** Affiliatenätverk som förmedlar provisionen. */
  network: "Adtraction" | "Impact" | "TBD";
  /** True först när riktig spårningslänk är inlagd. */
  tracking: boolean;
}

export const partners = {
  airalo: { url: "https://www.airalo.com/sv", label: "Airalo", network: "Impact", tracking: false },
  hallon: { url: "https://www.hallon.se", label: "Hallon", network: "Adtraction", tracking: false },
  vimla: { url: "https://vimla.se", label: "Vimla", network: "Adtraction", tracking: false },
  comviq: { url: "https://www.comviq.se", label: "Comviq", network: "Adtraction", tracking: false },
  saily: { url: "https://saily.com/sv", label: "Saily", network: "TBD", tracking: false },
} satisfies Record<string, Partner>;

export type PartnerKey = keyof typeof partners;
