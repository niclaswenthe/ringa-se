# Ringa.se – Projektplan & juridisk genomgång

*Framtagen augusti 2026. Kompletterar konceptrapporten "Ringa & surfa utomlands". Detta dokument är research och förberedelse – ingen juridisk rådgivning från advokat, men en kartläggning av vad som gäller och hur vi designar bort det mesta av kraven redan i arkitekturen.*

---

## Del 1: Juridisk genomgång

Fyra regelverk berör en svensk affiliatesajt: marknadsföringslagen, cookie-reglerna (LEK + GDPR), skattereglerna samt immaterialrätt/nätverksvillkor. Här är läget för vart och ett, och hur Ringa.se hanterar det.

### 1.1 Marknadsföringslagen – reklammärkning av affiliatelänkar

Detta är det viktigaste kravet och det som flest affiliatesajter slarvar med. Marknadsföringslagen (9 § MFL) kräver reklamidentifiering: all marknadsföring ska vara utformad så att läsaren lätt förstår att det är reklam, och det ska framgå vem som står bakom. Konsumentverket är tillsynsmyndighet och deras riktlinjer omfattar även affiliates – rättspraxis (bl.a. det uppmärksammade influencermålet) visar att det är publicisten, inte nätverket, som hålls ansvarig. Branschorganisationen IAB Sverige har en särskild rekommendation för märkning av affiliatelänkar i redaktionell miljö som är de facto-standarden.

**Så löser Ringa.se det:**
Varje sida som innehåller affiliatelänkar får en tydlig markering högst upp: *"Annonssamarbete: Den här sidan innehåller annonslänkar. Om du köper via länkarna kan Ringa.se få provision. Det påverkar aldrig priset för dig."* Dessutom märks varje enskild affiliateknapp/länk med "Annonslänk" i direkt anslutning. En separat sida "Så tjänar Ringa.se pengar" förklarar modellen öppet. Detta byggs in som en obligatorisk komponent i sajtmallen så att det aldrig kan glömmas bort på en ny sida.

Viktigt även: inga vilseledande påståenden. Priser och provisionssiffror i guiderna formuleras som "från cirka X kr" eller "kontrollera aktuellt pris hos leverantören" i stället för exakta belopp som kan bli inaktuella – det skyddar både mot vilseledande-regeln och mot underhållsbördan.

### 1.2 Cookies och GDPR – vi designar bort hela problemet

Regelverket är strängt: LEK (9 kap. 28 §) kräver aktivt, informerat samtycke innan icke-nödvändiga cookies sätts, och GDPR styr hur samtycket ska se ut. PTS är tillsynsmyndighet för cookiedelen och IMY för persondatadelen, och båda har trappat upp tillsynen – IMY har underkänt flera svenska företags cookiebanners, bland annat för att "avvisa" inte var lika enkelt som "acceptera" eller för att information om återkallande saknades. Banners måste dessutom finnas på svenska för en sajt som riktar sig till svenska besökare. Byråer noterar uttryckligen att affiliatemarknadsföring via nätverk som Adtraction normalt kräver korrekt cookiebanner.

**Så löser Ringa.se det – genom att inte behöva någon banner alls:**
Strategin är en helt cookiefri sajt. Det är fullt möjligt eftersom:

1. **Ingen analys via cookies.** I stället för Google Analytics används Cloudflare Web Analytics (gratis, cookiefri, serverbaserad) eller Plausible. Ingen spårning på besökarens enhet = inget samtyckeskrav.
2. **Affiliatelänkar som rena utlänkar.** Standardaffiliatelänkar är vanliga hyperlänkar till nätverkets spårningsdomän. Spårningscookien sätts av *nätverket/annonsören på deras domän* efter klicket – inte av Ringa.se på vår sida. Så länge vi inte bäddar in nätverkens skript, pixlar eller banner-iframes på sajten sätter Ringa.se inga tredjepartscookies. Regel i byggspecen: **inga externa skript, inga pixlar, inga inbäddade banners – endast textlänkar och egna knappar.**
3. **Inga formulär, inga konton, inga kommentarer.** Ingen insamling av personuppgifter över huvud taget i drift.

Det som ändå behövs: en kort integritets- och cookiesida på svenska som förklarar att sajten inte sätter icke-nödvändiga cookies, att klick på annonslänkar leder till tredje part som har egna villkor, samt kontaktuppgifter. Detta är billig försäkring och bygger förtroende. Skulle vi någon gång vilja lägga till något som kräver samtycke (osannolikt) tas beslutet aktivt då, med CMP.

Denna design eliminerar den enskilt största juridiska risken och den enskilt största underhållsbördan i ett svep.

### 1.3 Skatt – hobby, näringsverksamhet och moms

Här är bilden för din situation (heltidsanställd, sidoprojekt):

**Inkomstskatt.** Gränsen mellan hobby och näringsverksamhet avgörs av tre kriterier – självständighet, varaktighet och vinstsyfte – och det finns ingen fast beloppsgräns; Skatteverket gör en samlad bedömning i varje enskilt fall. Skatteverket nämner uttryckligen internetinkomster som influencer/bloggare som exempel på sådant som kan redovisas som hobby när verksamheten är av mindre omfattning. Hobbyinkomster beskattas i inkomstslaget tjänst, du deklarerar överskottet (inkomster minus kostnader som domänförnyelse) i din vanliga deklaration, och du ska spara underlag i sju år. Det finns ingen skattefri gräns – överskott ska alltid tas upp.

I praktiken: så länge intäkterna är småskaliga (hundralappar–enstaka tusenlappar per år) redovisas de som hobby/tjänst i din inkomstdeklaration. Blir intäkterna regelbundna och betydande – eller om en domänförsäljning på tiotusentals kronor blir aktuell – är det läge att registrera enskild näringsverksamhet med F-skatt. Att affiliaten har vinstsyfte talar strikt taget för näringsverksamhet redan från start, så en pragmatisk hållning är: börja som hobby, men var beredd att registrera enskild firma om det tar fart. Registreringen är gratis hos Skatteverket och kan göras på en kväll.

**Moms.** Sedan 1 januari 2025 gäller en omsättningsgräns på 120 000 kr per år – understiger omsättningen den nivån behöver du inte momsregistrera dig, lämnar inga momsdeklarationer och lägger ingen moms på intäkterna. Det täcker med bred marginal alla realistiska affiliate-scenarier de första åren. Observera dock en teknikalitet: provisioner från utländska nätverk (t.ex. Impact för Airalo) kan aktualisera omvänd skattskyldighet, som inte omfattas av momsbefrielsen. Det är en fråga att ställa till Skatteverkets upplysning *innan* första utbetalningen från ett utländskt nätverk – ett kort samtal, men värt att pricka av.

**Domänförsäljningen.** Hur en försäljning av Ringa.se beskattas beror på sammanhanget (privat tillgång/kapital kontra tillgång i näringsverksamhet). Eftersom beloppen kan bli betydande: stäm av med Skatteverket eller en redovisningskonsult *när ett konkret bud finns*, före påskrift. Ingen åtgärd behövs nu.

### 1.4 Immaterialrätt, e-handelslagen och nätverksvillkor

**Varumärken och logotyper.** Operatörernas och eSIM-bolagens logotyper får inte användas fritt. Regel: använd endast material som nätverken tillhandahåller via Adtraction/Impact (de licensierar materialet för godkända partners) – men eftersom vi kör cookiefritt utan inbäddade banners blir det i praktiken textomnämnanden, vilket är oproblematiskt. Att nämna varumärken i löptext ("Hallon har EU-priser i Storbritannien") är tillåtet.

**Upphovsrätt.** Allt innehåll skrivs som originaltext. Bilder: egna, licensfria (Unsplash o.dyl. med koll på licensvillkor) eller inga alls – sajten klarar sig utmärkt textbaserad med enkel egen grafik.

**Kontaktuppgifter.** Lagen om elektronisk handel kräver att den som tillhandahåller en informationssamhällestjänst anger namn, adress och e-post. En "Om Ringa.se"-sida med namn och e-postadress täcker detta. (Utgivningsbevis behövs inte och är inget vi ska skaffa – det skulle tvärtom öka kraven.)

**Nätverkens egna regler.** Adtraction och Impact har partnervillkor som typiskt förbjuder: budgivning på annonsörens varumärke i sökordsannonsering (irrelevant för oss – vi kör ingen annonsering), vilseledande påståenden, cookie stuffing och självklick. Kravet på att uppge korrekt sajtinfo vid ansökan betyder att sajten bör vara publicerad med grundinnehåll *innan* ansökningarna skickas – vissa program godkänner inte tomma sajter. Det styr ordningsföljden i planen nedan.

### 1.5 Juridisk slutsats

Med cookiefri arkitektur, obligatorisk annonsmärkning i mallen, originalinnehåll utan logotyper, en om-sida med kontaktuppgifter och hobbyredovisning av intäkterna är Ringa.se compliant från dag ett med minimal ansträngning. De två uppföljningspunkterna som återstår är samtalet till Skatteverket om omvänd skattskyldighet före första utländska utbetalningen, och skatterådgivning inför en eventuell domänförsäljning.

---

## Del 2: Projektplan

### Fas 0 – Förberedelser (nu, utan att bygga)

Allt i denna fas är gjort eller görs klart i chatt/dokument, så att byggfasen i Claude Code blir ren exekvering.

Färdigt i och med detta dokument: koncept, intäktsmodell, juridisk kartläggning, arkitekturbeslut (cookiefritt, statiskt), innehållsplan och byggspecifikation (separat fil, BYGGSPEC.md).

**Beslutat upplägg (aug 2026):** AB:et driver sajten och tar emot affiliateintäkterna (bolagsskatt 20,6 % + utdelning 20 % inom gränsbeloppet slår normalt marginalskatt på tjänst, och bolagets befintliga bokföring och momsregistrering löser administrationen). Domänen Ringa.se ägs kvar **privat** av Niclas tills ett konkret försäljningsbud finns – då tas skatterådgivning innan beslut om försäljning sker privat eller via bolaget. Ingen överlåtelse av domänen till AB:et görs nu.

Kvarstår för dig, kräver inga pengar:

1. **Domänstädning hos Internet.se** (bekräftat: domänen står på ditt personnummer, med den nedlagda enskilda firmans namn i kontaktuppgifterna). Eftersom en enskild firmas org-nummer är ditt personnummer är du redan innehavare privat – inget ägarbyte behövs, bara en kostnadsfri kontaktuppdatering i kontrollpanelen/via supporten där firmanamnet byts mot ditt eget namn och aktuell e-postadress. Passa samtidigt på att verifiera förfallodatum och att autoförnyelse är på.
2. **Registrarflytt för lägre årskostnad.** Jämför årsfakturan från Internet.se Svenska AB med marknadens lägsta förnyelsepriser (Hostup ca 211 kr/år, Inleed strax däröver, inkl. DNS, WHOIS-skydd och registerlås). Är fakturan högre: begär transfer-nyckel (auth-kod) från Internet.se – lämnande registrar får inte ta ut flyttavgift enligt Internetstiftelsens villkor – och beställ flytt hos ny registrar (kostar ca ett års förnyelse). Gör flytten i god tid före förfallodatum och inte samma vecka som sajtlanseringens DNS-ändringar. Bonus: skulle en överlåtelse till AB:et bli aktuell längre fram är ägarbytesavgiften väsentligt lägre hos dessa registrarer än Internet.se:s 950 kr.
3. ~~Skaffa/välj e-postadress~~ **Beslutat: info@ringa.se** via Cloudflare Email Routing → Gmail (se Del 4). Sätts upp i samband med att DNS pekas mot Cloudflare; fram till dess används privata Gmail-adressen i konton som skapas i punkt 4.
4. Skapa konton (gratis, 30 min totalt): GitHub, Cloudflare (Pages + Web Analytics), Google Search Console. Sedo-konto väntar tills sajten är uppe.
5. Hämta AB:ets uppgifter till om-sidan: bolagsnamn, org-nummer och kontaktadress (ersätter tidigare plan med privat namn).

### Fas 1 – Bygget (i Claude Code, när du är redo)

Beräknad omfattning: en helg. BYGGSPEC.md är skriven för att klistras in som projektbrief i Claude Code och innehåller sajtkarta, teknikval, alla obligatoriska juridiska komponenter och innehållsinstruktioner per sida. Ordningen:

1. Repo + statisk sajt enligt spec (Astro, byggs till ren HTML).
2. De juridiska sidorna och annonsmärkningskomponenten byggs *först* – de är krav, inte tillval.
3. De tio innehållssidorna genereras och faktagranskas.
4. Publicering på Cloudflare Pages, DNS pekas om för Ringa.se, HTTPS aktiveras automatiskt.

### Fas 2 – Lansering och ansökningar (veckan efter bygget)

1. Skicka in sitemap till Google Search Console.
2. Ansök hos Adtraction (Hallon, Vimla, Comviq m.fl. telekomprogram) och hos Airalo via Impact.com – nu med en live sajt att visa upp, vilket höjer chansen till godkännande. Saily-programmet utvärderas som komplement.
3. När godkännanden kommit: byt platshållarlänkarna mot riktiga spårningslänkar (en sökväg per program, förberedd i koden som konfigfil – fem minuters jobb).
4. Lista domänen passivt på Sedo och Dan.com med "make offer", och aktivera till-salu-raden i sidfoten.

### Fas 3 – Agentdriven drift (ca 10 min/månad)

I stället för en årlig manuell genomgång sköts aktualiteten av en agentpipeline med dig som beslutsfattare:

**Månadsjobbet.** Ett schemalagt GitHub Actions-jobb (första måndagen varje månad) kör en agent med webbsökning som faktagranskar sajtens påståenden mot källorna: operatörernas roamingvillkor (Hallon/Vimla/Comviq, särskilt UK- och USA-villkor), eSIM-stöd, EU:s roamingregler, samt att affiliatelänkarna svarar korrekt. Agenten spanar också efter nyheter värda en kort notis och efter nya affiliateprogram med bättre villkor.

**Människa-i-loopen är obligatorisk.** Agenten publicerar aldrig direkt. Hittar den avvikelser öppnar den en pull request med föreslagen ändring, källhänvisning och motivering. Du läser diffen i mobilen, godkänner eller avslår, och sajten bygger om sig automatiskt vid merge. Hittas inget stämplar agenten bara om "Senast faktagranskad"-datumet i en egen PR. Skälet är juridiskt: ansvaret enligt marknadsföringslagen ligger på publicisten – ett hallucinerat pris i drift är ditt problem, inte agentens. PR-modellen ger nästan all automatik med bibehållen kontroll.

**Insats och kostnad.** Din tid: ca 10 minuter per månad. Kostnad: API-tokens för någon tia i månaden, eller noll om jobbet i stället körs manuellt i Claude Code när det passar. Detaljerad specifikation (schema, promptar, PR-flöde, skyddsräcken) finns i BYGGSPEC.md.

Årsrutinen i januari kvarstår i lätt form: läs av analytics, kolla eventuella domänbud, uppdatera årtal i sidtitlar (agentens PR påminner).

### Beslutspunkter längre fram

Registrera enskild firma? Ja, om årsintäkterna passerar cirka 10 000 kr eller blir regelbundna, eller inför en domänaffär. Utöka innehållet? Endast om data visar att en specifik landsguide drar trafik – då kan systerguider ("eSIM Vietnam") läggas till med samma mall på en kväll. Sälja? Vid seriöst bud: skatterådgivning först, förhandla utifrån att sajten då har trafik och intäktshistorik som höjer värdet.

---

## Del 3: Innehållsplan (13 sidor/verktyg vid lansering)

**Positionering:** Ringa.se är inte en affiliateguide utan "Sveriges begripligaste källa om att ringa och surfa utomlands" – som öppet finansieras med annonslänkar. Trovärdigheten är affärsstrategin: den höjer konverteringen, gynnar Google-rankingen och är det som gör domänen värdefull för en framtida köpare. Därför byggs djup i stället för färskhet – verktyg och förklaringar som är genuint användbara men statiska, aldrig dagsfärska prisjämförelser.

**AI-synlighet som tredje kanal:** Sökbeteendet flyttar från Google till AI-assistenter (ChatGPT, Gemini, Claude, Perplexity), och strategin är att bli källan dessa citerar och länkar – "enligt Ringa.se..." – i stället för att assistenten skickar användaren direkt till en affiliatebutik. Konkret: alla AI-crawlers välkomnas uttryckligen i robots.txt (många sajter blockerar dem fortfarande av gammal vana och tappar synlighet), en llms.txt publiceras, allt innehåll skrivs i citerbart format (frågerubriker, fristående svar först, källhänvisade fakta), och strukturerad data signalerar aktualitet via faktagranskningsdatumet. Verktygssidorna är spjutspetsen: en AI kan återge fakta men inte vara en kalkylator – den hänvisar dit. Full specifikation i BYGGSPEC.md, sektionen "AI-synlighet (GEO)".

1. **Startsida** – "Ringa & surfa utomlands utan chockfaktura" med vägvisare till guider och verktyg.
2. **Stora guiden: Ringa och surfa utomlands 2026** – pelarsida, hubben allt länkar till.
3. **eSIM för nybörjare** – vad det är, hur installation går till, vilka telefoner som stöds.
4. **Roaming utanför EU – så undviker du fällorna** – EU-reglerna kort, sedan riskländerna.
5. **Verktyg: Funkar eSIM i min telefon?** – interaktiv kollare (välj märke/modell → svar), statisk data inbyggd vid build, ingen server. Trovärdighets- och länkmagnet.
6. **Verktyg: Roamingkalkylator** – "vad kostar min veckoresa?" (välj land + surfbehov → uppskattning med operatörsroaming vs eSIM, med annonsmärkt eSIM-länk i resultatet). Uppskattningar i spann, inte exakta priser.
7. **Ordlista: Tekniken förklarad enkelt** – eSIM, roaming, APN, WiFi-samtal, VoLTE, spärrar m.m. En sida, ankarlänkar, evigt hållbar.
8. **eSIM & ringa i Thailand** (landsguide, mall för de följande)
9. **eSIM & ringa i USA**
10. **eSIM & ringa i Turkiet** (utanför EU-roaming – hög sökrelevans)
11. **eSIM & ringa i Storbritannien** (post-Brexit-gråzonen: operatörerna gör olika – Telia/Telenor tar betalt, andra inte – vilket skapar exakt den förvirring en guide löser; direkt synergi med abonnemangsguiden och Hallon-vinkeln)
12. **Bästa svenska abonnemanget för dig som reser** – Adtraction-benet: Hallons EU-priser även i UK, eSIM-stöd hos Vimla/Comviq/Hallon.
13. **Om Ringa.se / Så tjänar vi pengar / Integritet & cookies** – de juridiska sidorna (kan vara 2–3 separata URL:er).

Varje landsguide följer samma struktur: fungerar min svenska operatör där och vad kostar det → varför eSIM oftast är bättre utanför EU → rekommenderad eSIM med annonsmärkt länk → praktiska tips (riktnummer, WiFi-samtal, nödnummer). Strukturen är medvetet handlingsorienterad (leder till köp) snarare än ren fakta – det är också försvaret mot att AI-sökmotorer äter upp trafiken. Varje innehållssida visar "Senast faktagranskad: [månad år]" – datumet uppdateras av agentpipelinen (se Fas 3) och är en förtroendesignal mot både läsare och Google.

---

## Del 4: Öppna frågor inför spadtaget — AVGJORDA (aug 2026)

Båda besluten är tagna:

**(1) E-post: info@ringa.se.** Sätts upp med Cloudflare Email Routing (gratis, ingår när DNS ändå flyttas till Cloudflare vid lanseringen): inkommande mejl till info@ringa.se vidarebefordras till Niclas privata Gmail. Utgående svar via Gmails "Skicka e-post som"-alias så att svar avgår från info@ringa.se. Adressen används för nätverksansökningar, Search Console, om-sidan och domänens kontaktuppgifter.

**Agentbevakning av inkorgen (byggs efter lansering, i wenthe_bot):** assistent-agenten bevakar Gmail efter mejl adresserade till info@ringa.se (eget Gmail-filter/etikett), skriver ett färdigt svarsutkast och meddelar Niclas via Telegram: "Nytt mejl till info@ringa.se — här är ett utkast." Niclas godkänner, redigerar eller avslår; inget skickas utan godkännande (samma människa-i-loopen-princip som faktagranskningspipelinen). Särskilt viktigt för domänbud: agenten flaggar köpförfrågningar med hög prioritet.

**(2) Länder: Thailand, USA, Turkiet, Storbritannien.** Researchbaserat beslut (aug 2026): Thailand (svenskarnas största långresemål, toppbokat vinter 25/26 hos både Ving och TUI), USA (stort resmål med dyrast roaming) och Turkiet (topp-charterdestination utanför EU-roaming, prisvärdhetstrend) är självklara. Fjärde platsen gick till **Storbritannien i stället för Spanien**: post-Brexit gör svenska operatörer olika (Telia/Telenor tar roamingavgift, Tele2/Tre/Vimla m.fl. behåller EU-villkor) — genuin förvirring med pengapåverkan ger hög sökrelevans och köpintention, guiden har direkt synergi med abonnemangsguidens Hallon/Vimla-vinkel, och nyansen gör sidan mer citerbar för AI-assistenter än ett EU-land där svaret är "det ingår". Spanien passade dessutom illa i landsguidemallen, vars steg 2 är "därför är eSIM oftast bättre här" — inom EU är det oftast inte det.

**Första expansionskandidater** (om trafikdata motiverar): Spanien (volymresmål nr 1 – EU-vinkeln, byggs då med anpassad mall utan eSIM-säljsteg), Egypten (stor vintercharter utanför EU). Om-sidefrågan är avgjord: sajten drivs av AB:et, så om-sidan anger bolagsnamn, org-nummer och kontaktuppgifter, medan domänen ägs privat (behöver inte anges på sajten). Notera att sidfotens till-salu-rad hänvisar till dig som privat domäninnehavare – formuleringen "Domänen ringa.se kan förvärvas, kontakta [e-post]" håller isär rollerna.
