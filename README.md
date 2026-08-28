# Ringa.se

Sveriges begripligaste källa om att ringa och surfa utomlands – statisk,
cookiefri Astro-sajt som deployas till Cloudflare Pages via push till main.

Fullständig specifikation: [BYGGSPEC.md](BYGGSPEC.md).
Projektplan och juridisk genomgång: [ringa-se-projektplan-juridik.md](ringa-se-projektplan-juridik.md).

## Kommandon

```bash
npm install        # en gång
npm run dev        # lokal utvecklingsserver
npm run build      # astro check + statisk build till dist/
npm run preview    # förhandsgranska byggd sajt
```

## Hårda regler (se BYGGSPEC.md för detaljer)

- **Inga externa skript, pixlar eller inbäddningar** – cookiefriheten är
  sajtens juridiska fundament (LEK 9 kap. 28 §).
- **Ingen localStorage** – verktygens state lever i minnet under sidvisningen.
- Varje sida med affiliatelänkar renderar `<AdDisclosure />` (via
  `GuideLayout` + obligatorisk prop `hasAffiliateLinks`), och varje
  affiliatelänk går via `<AffiliateButton />` (märkning "Annonslänk" +
  `rel="sponsored noopener"`).
- Affiliatelänkar byts endast i `src/config/partners.ts`.
- Faktapåståenden registreras i `agents/claims.yml` och granskas månatligen
  av fact-check-workflowet (`.github/workflows/fact-check.yml`) – alltid via
  pull request, aldrig direktpublicering.

## Kvarvarande TODO före lansering

1. Spårningslänkar för de svenska operatörerna i `src/config/partners.ts`
   (efter Adtraction-godkännande). Airalo är klart sedan 2026-08-28, med
   djuplänkar per land via `deepLinks` och `mal`-propen på
   `<AffiliateButton />`.

Faktagranskningen körs månatligen lokalt på ägarens server via Claude Code
(prenumeration, 0 kr API-kostnad); `.github/workflows/fact-check.yml` är
manuell backup pinnad till Haiku 4.5.
