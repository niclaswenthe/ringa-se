# BYGGSPEC.md – Ringa.se

*Denna fil är skriven för att användas som projektbrief/CLAUDE.md i Claude Code. Den innehåller allt som behövs för att bygga sajten från noll till publicerbar. Juridiska krav är markerade [KRAV] och får inte utelämnas eller förenklas bort.*

## Vad som byggs

En statisk, cookiefri svensk informationssajt på domänen ringa.se, positionerad som "Sveriges begripligaste källa om att ringa och surfa utomlands" – öppet finansierad med annonslänkar. Tretton sidor enligt sajtkartan nedan, varav tre interaktiva verktyg som bygger trovärdighet och länkar. Intäkter via affiliatelänkar (eSIM + svenska mobiloperatörer) och en diskret domän-till-salu-modul. Aktualitet sköts av en månatlig agentpipeline med människa-i-loopen. Målet är minimalt underhåll: inga databaser, inga beroenden som ruttnar, ingen server.

## Teknikval

- **Ramverk:** Astro (statisk output, noll JS till klienten som standard). Alternativ om enklare önskas: ren HTML + delade partials via elva/11ty. Inga React-öar behövs.
- **Hosting:** Cloudflare Pages, deploy via GitHub-repo (push till main = publicering).
- **Analys:** Cloudflare Web Analytics (beacon-fri/serverbaserad variant) ELLER ingen analys alls vid lansering. [KRAV] Inga cookiebaserade analysverktyg (ingen Google Analytics, ingen Meta-pixel, ingen Hotjar).
- **Typsnitt:** systemtypsnitt (ingen extern fonthämtning – prestanda + integritet).
- **Bilder:** inga externa inbäddningar. Egna SVG-illustrationer eller inga bilder. Om foton används: lokalt lagrade, licensdokumenterade i /docs/licenser.md.
- [KRAV] **Inga externa skript över huvud taget.** Inga nätverks-widgets, banner-iframes, spårningspixlar, YouTube-inbäddningar, Google Maps eller delningsknappar. Detta är förutsättningen för att sajten ska vara laglig utan cookiebanner (LEK 9 kap. 28 §). Affiliatelänkar ska vara rena `<a href>`-länkar till nätverkens spårnings-URL:er.

## Affiliatelänkar – arkitektur

Alla utgående affiliatelänkar hanteras via en central konfigfil, `src/config/partners.ts`:

```ts
export const partners = {
  airalo: { url: "PLACEHOLDER_TILLS_GODKÄND", label: "Airalo", network: "Impact" },
  hallon: { url: "PLACEHOLDER_TILLS_GODKÄND", label: "Hallon", network: "Adtraction" },
  vimla:  { url: "PLACEHOLDER_TILLS_GODKÄND", label: "Vimla", network: "Adtraction" },
  comviq: { url: "PLACEHOLDER_TILLS_GODKÄND", label: "Comviq", network: "Adtraction" },
  saily:  { url: "PLACEHOLDER_TILLS_GODKÄND", label: "Saily", network: "TBD" },
};
```

Innan godkännande pekar platshållarna på partnerns vanliga webbplats (ej spårningslänk). När spårningslänkarna kommer byts de på ETT ställe. Alla utlänkar får `rel="sponsored noopener"` [KRAV – sponsored är Googles krav för betalda länkar och skyddar SEO].

## Obligatoriska komponenter [KRAV]

Bygg dessa FÖRST, före innehållssidorna:

1. **`<AdDisclosure />`** – banner som renderas överst i innehållsytan på varje sida som innehåller minst en affiliatelänk. Text: "Annonssamarbete: Den här sidan innehåller annonslänkar. Om du beställer via länkarna kan Ringa.se få provision från leverantören. Det påverkar aldrig priset för dig. Läs mer om hur Ringa.se finansieras." (länk till /om/sa-tjanar-vi-pengar). Får inte gå att utelämna av misstag: gör den till en del av sidmallen `GuideLayout` som kräver prop `hasAffiliateLinks: boolean` utan defaultvärde.
2. **`<AffiliateButton />`** – knappkomponent för själva affiliatelänken. Renderar alltid ordet "Annonslänk" i liten text i direkt anslutning till knappen (MFL 9 § reklamidentifiering, IAB Sveriges rekommendation).
3. **Sidfot** – på alla sidor: länkar till Om Ringa.se, Så tjänar vi pengar, Integritet & cookies. Årtal genereras vid build. *(Ändrat 2026-08-21: domän-till-salu-raden är borttagen helt på ägarens beslut – trovärdigheten som konsumenttjänst prioriteras; kan återinföras i ett senare skede.)*

## Juridiska sidor [KRAV]

- **/om/** – "Ringa.se drivs av [BOLAGSNAMN AB], org.nr [ORG-NR]. Kontakt: info@ringa.se." (Lagen om elektronisk handel kräver namn/firma + e-post; för bolag anges org-nummer.) Domänen ägs privat av grundaren – sidfotens till-salu-rad formuleras "Domänen ringa.se kan förvärvas, kontakta info@ringa.se" utan att blanda in bolaget. Bolagsuppgifterna fylls i före lansering – lämna tydlig TODO-markering.
- **/om/sa-tjanar-vi-pengar/** – öppen förklaring av affiliatemodellen, vilka nätverk (Adtraction, Impact) och att redaktionella omdömen inte styrs av provision.
- **/om/integritet-cookies/** – på svenska: "Ringa.se sätter inga cookies och samlar inte in personuppgifter. När du klickar på en annonslänk lämnar du Ringa.se; mottagande webbplats har egna villkor och kan sätta cookies enligt sin egen cookiepolicy." Plus kontaktuppgift och en mening om att tillsynsmyndigheter är PTS (cookies) och IMY (personuppgifter).

## Sajtkarta och URL-struktur

```
/                               Startsida
/guider/ringa-utomlands/        Pelarguide: Ringa & surfa utomlands 2026
/guider/esim-for-nyborjare/     Vad är eSIM, installation, telefonstöd
/guider/roaming-utanfor-eu/     Fällor och regler utanför EU
/verktyg/esim-kollare/          Interaktiv: Funkar eSIM i min telefon?
/verktyg/roamingkalkylator/     Interaktiv: Vad kostar min resa?
/ordlista/                      Tekniken förklarad enkelt (ankarlänkar per term)
/lander/thailand/               eSIM & ringa i Thailand
/lander/usa/                    eSIM & ringa i USA
/lander/turkiet/                eSIM & ringa i Turkiet
/lander/storbritannien/         eSIM & ringa i Storbritannien
/guider/basta-abonnemang-resa/  Bästa svenska abonnemanget för resenärer
/om/  /om/sa-tjanar-vi-pengar/  /om/integritet-cookies/
```

## Verktygssidorna (interaktiva, men fortfarande statiska)

Verktygen är sajtens trovärdighets- och länkmagneter. De byggs som öar av vanilla-JS/liten Astro-komponent med ALL data inbäddad vid build – ingen server, inga API-anrop i drift, inga cookies. [KRAV] Verktygen får inte spara något på användarens enhet (ingen localStorage) – all state lever i minnet under sidvisningen.

- **eSIM-kollaren:** användaren väljer telefonmärke och modell ur en lista → svar ja/nej/delvis med kort förklaring. Datat är en JSON-fil i repot (`src/data/esim-devices.json`) som agentpipelinen håller uppdaterad. Täck de ~60 vanligaste modellerna i Sverige; fallback-svar med instruktion "så kollar du själv i inställningarna" för okända modeller.
- **Roamingkalkylatorn:** användaren väljer land (de fyra landsguidernas länder + "annat land utanför EU"/"inom EU") och surfbehov (lätt/normal/mycket) → uppskattat kostnadsspann för operatörsroaming respektive eSIM, alltid i spann ("cirka 150–300 kr"), aldrig exakta priser. Resultatet visar en AffiliateButton mot eSIM-partnern. Sidan har AdDisclosure eftersom resultatet innehåller annonslänk. Antaganden och räknegrunder redovisas öppet under resultatet (trovärdighet + MFL-skydd mot vilseledande).
- **Ordlistan:** ren innehållssida med `<dl>`-struktur, id-ankare per term (`/ordlista/#volte`), DefinedTerm-schema i JSON-LD. Guider länkar till termer i stället för att förklara om samma sak.

## Innehållsregler

- Språk: svenska, du-tilltal, sakligt men lättsamt. Inga superlativ utan täckning (MFL: inga vilseledande påståenden).
- Priser skrivs "från cirka X kr" eller "kontrollera aktuellt pris hos [partner]" – aldrig exakta priser som åldras. Årtal endast i sidtitlar (uppdateras årligen), inte inbakade i löptext.
- Varumärken nämns i text men logotyper används inte. [KRAV]
- Allt innehåll originalskrivet. Fakta om EU-roaming, riktnummer och nödnummer dubbelkollas mot officiella källor vid skrivtillfället.
- Varje landsguide följer mallen: (1) Fungerar min svenska operatör där & vad kostar det, (2) Därför är eSIM oftast bättre här, (3) Rekommenderad eSIM [AffiliateButton], (4) Praktiskt: riktnummer, WiFi-samtal, nödnummer, (5) Vanliga frågor (3–5 st, korta).
- SEO: unik title + meta description per sida, en H1 per sida, FAQ-sektioner med FAQPage-schema (JSON-LD, statiskt genererad – inget skript), intern länkning nav mellan pelarguide och landsguider, sitemap.xml och robots.txt genereras vid build.

## AI-synlighet (GEO) [strategiskt krav]

Allt fler hittar information och köpråd via AI-assistenter (ChatGPT, Gemini, Claude, Perplexity) i stället för Google. Målet: när en AI-assistent svarar på en fråga om att ringa/surfa utomlands ska den citera och länka Ringa.se – inte en affiliatebutik. Detta byggs in så här:

**1. Agent-allow i robots.txt.** Alla stora AI-crawlers och sökbotar tillåts uttryckligen (motsatsen till slentrianblockering): GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended. Explicita Allow-block per user-agent + sitemap-referens, så att ingen framtida wildcard-regel råkar stänga ute dem. (Kommentar i filen förklarar att detta är avsiktligt.)

**2. llms.txt.** Publicera `/llms.txt` – markdown-översikt över sajtens sidor med en radbeskrivning per sida och direktlänkar. Genereras vid build från sajtkartan så den aldrig blir inaktuell. (Community-standard, inte officiell – kostar inget, kan bara hjälpa.)

**3. Citerbart innehållsformat [gäller allt innehåll]:**
- H2/H3-rubriker formuleras som de frågor användare ställer till assistenter ("Fungerar mitt svenska abonnemang i Thailand?", "Vad kostar roaming i USA?").
- Varje sektion inleds med ett fristående, komplett svar i 1–3 meningar som håller att lyftas ut ur sitt sammanhang – detaljer och nyanser därefter. En AI ska kunna citera första stycket rakt av och det ska bli korrekt.
- Konkreta fakta med källhänvisning (länk till operatörsvillkor, EU-förordning) – verifierbarhet är en rankingfaktor i AI-svar.
- Konsekvent entitetsinfo: samma beskrivning av vad Ringa.se är på om-sidan, i schema och i llms.txt.

**4. Utökad JSON-LD.** Utöver FAQPage och DefinedTerm: WebSite + Organization på startsidan (namn, beskrivning, utgivare), Article med `dateModified` kopplat till `factChecked`-datumet på varje guide (aktualitet är en AI-urvalssignal), HowTo-schema på installationsguiden.

**5. Verktygen som klickmagnet.** AI-svar minskar klick på rena faktasidor – försvaret är att erbjuda det ett AI-svar inte kan vara: interaktiva verktyg (eSIM-kollaren, kalkylatorn) som assistenten hänvisar *till* i stället för att återge. Verktygssidorna får därför tydliga, beskrivande titlar och meta descriptions skrivna för att bli rekommenderade som destination.

## Agentpipeline för drift [byggs i Fas 1, aktiveras efter lansering]

Syfte: hålla sajten faktamässigt aktuell utan manuellt arbete, med ägaren som enda beslutsfattare.

**Arkitektur:** GitHub Actions-workflow `fact-check.yml`, schemalagd cron första måndagen varje månad (+ manuell trigger via workflow_dispatch). Jobbet kör Claude med webbsökning (t.ex. via Claude Code i CI eller Anthropic API med web search-verktyget) mot en granskningsprompt i repot: `agents/fact-check-prompt.md`.

**Agentens uppdrag per körning:**
1. Läs `agents/claims.yml` – ett register över sajtens granskningsbara påståenden, var och ett med: påstående, fil/rad-referens, källa-URL, senast verifierad. (Registret skapas i Fas 1; varje faktapåstående i guiderna ska ha en post.)
2. Verifiera varje påstående mot källan via webbsökning: operatörernas roamingvillkor, eSIM-stöd i `esim-devices.json`, EU-regler, kalkylatorns spann, att partnerlänkarna i `partners.ts` svarar (HTTP-status).
3. Spana: nyheter värda en kortnotis, nya/bättre affiliateprogram i nischen.

**Utfall – alltid via pull request, aldrig direktpublicering [KRAV]:**
- Avvikelse hittad → PR per ämne med föreslagen ändring, källhänvisning och motivering i PR-beskrivningen.
- Inga avvikelser → en PR som endast stämplar om "Senast faktagranskad"-datum (frontmatter-fältet `factChecked`) på granskade sidor.
- Osäkerhet → agenten ändrar inget utan flaggar i PR-kommentar. Hellre en fråga än en gissning.

Skäl till PR-tvånget: publicistansvaret enligt MFL ligger på ägaren; agenten får aldrig kunna publicera ett felaktigt påstående utan mänskligt godkännande. Merge till main → automatisk build och deploy via Cloudflare Pages.

**Skyddsräcken:** agenten får endast ändra innehållsfiler, `claims.yml`, `esim-devices.json` och `factChecked`-datum – aldrig komponenterna AdDisclosure/AffiliateButton, juridiska sidor, `partners.ts` eller workflows (skyddas via CODEOWNERS + branch protection på main). Max en körning per schema; API-nyckel som repo secret.

**Sidmall-krav:** varje innehållssida har frontmatter-fältet `factChecked: YYYY-MM` som renderas som "Senast faktagranskad: [månad år]" under H1.

## Definition of done

1. `npm run build` ger ren statisk output utan varningar.
2. Ingen sida sätter någon cookie och inget sparas i localStorage (verifiera i devtools på byggd sajt, inklusive verktygssidorna). Inga anrop till tredjepartsdomäner utom användarklick på utlänkar.
3. Lighthouse: 95+ på Performance, Accessibility, SEO.
4. Alla [KRAV]-punkter uppfyllda; AdDisclosure syns på samtliga sidor med affiliatelänkar, inklusive roamingkalkylatorn.
5. eSIM-kollaren och kalkylatorn fungerar utan nätverksanslutning efter sidladdning (all data inbäddad).
6. `agents/claims.yml` täcker alla faktapåståenden i guiderna; `fact-check.yml` går att köra manuellt (workflow_dispatch) och producerar en korrekt PR i testkörning.
7. `robots.txt` innehåller explicita Allow-block för samtliga listade AI-user-agents och `/llms.txt` genereras vid build med korrekta länkar. Varje guides första stycke per H2-sektion fungerar som fristående citat (stickprovsgranska 5 sektioner).
8. TODO-markeringar kvarstår endast för: bolagsuppgifter på om-sidan, riktiga spårningslänkar i partners.ts, aktivering av cron-schemat.

## Efter deploy (manuellt, ägaren)

1. Peka ringa.se mot Cloudflare Pages (DNS), verifiera HTTPS.
2. Aktivera Cloudflare Email Routing: info@ringa.se → vidarebefordran till privata Gmail; sätt upp Gmails "Skicka e-post som"-alias för utgående svar. (Agentbevakning av inkorgen byggs därefter i wenthe_bot — se projektplanen Del 4.)
3. Lägg till sajten i Google Search Console, skicka in sitemap.
4. Ansök: Adtraction (Hallon/Vimla/Comviq) och Airalo via Impact.com. Vid godkännande: ersätt platshållare i partners.ts, pusha.
5. ~~Lista domänen på Sedo + Dan.com (make offer).~~ *(Vilande 2026-08-21: domänförsäljningsspåret är pausat i sin helhet – omprövas senare vid behov.)*
