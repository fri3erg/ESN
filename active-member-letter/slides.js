// The letter, one entry per slide. `lead` is the first line, shown bigger; `body` the paragraphs after it.
// `art`: the page drawn under the text (a folder in art/, copied from the ascii_art repo's projects/lettera).
// A \n in `lead` or in a `body` paragraph starts a new line there.
// `color`: the text colour, picked to match the art.
// `behind: true` lets the art fill the whole screen behind the text instead of sitting below it.
// `down: 20` pushes the art 20% lower; `zoom: 1.3` makes it 30% bigger (both crop it at the edges);
// `zoomWide` is the zoom on wide screens only (below 1 shrinks it).
// `overlap: true` lets art that sits below the text rise a little under it.
// `textAt`: "middle" centres the text on the screen, "lower" moves it down from the top,
// "light" keeps the shade under the text lighter so the art's sky shows, "big" makes the first line bigger,
// "swap" shows the first line small and the rest big, and swaps their two colours. Several can be combined: "middle big".
export const SLIDES = [
  { art: "art/esn/", color: "#8fdcff", cover: true, behind: true, down: 6, textAt: "light",
    lead: "Ciao amori miei.", body: ["Sì lo so, grande sorpresa"] },
  { art: "art/02-pioggia/", color: "#8db8ff", behind: true, textAt: "middle big",
    lead: "Devo dirlo,\nnon sono entrato in ESN per un nobile motivo.",
    body: ["Volevo amici.\nUna scusa per uscire di casa.\nGente con cui organizzare cose, come facevo già prima,\nma con chi ha davvero voglia di farlo."] },
  { art: "art/03-alba/", color: "#ffc76e", behind: true, down: 18, textAt: "light",
    lead: "Poi però",
    body: ["Mi sono innamorato\ndel sorridere alla gente.\nDel farla sentire in uno spazio fatto tutto per loro.",
           "Dell'essere una faccia gentile in un posto sconosciuto."] },
  { art: "art/04-sezione/?top=0.36&wide=0.24", color: "#ff9fcf", behind: true, textAt: "light",
    lead: "Ho iniziato in una sezione piccola, un po' disorganizzata e molto umana.",
    body: ["Lì, sia da newbie che Erasmus io stesso, mi sentivo davvero accolto come persona, e non come un ruolo."] },
  { art: "art/05-bologna/", color: "#f2a65e",
    lead: "Di Bologna, lo ammetto, avevo un po' paura.",
    body: ["Me la immaginavo organizzata, burocratica, piena di aspettative."] },
  { art: "art/06-limoncello/", color: "#f3e45e", behind: true, down: 22,
    lead: "Non mi aspettavo voi.",
    body: ["Le vostre personalità\ncosì diverse e interessanti,\nil limoncello, le party bag, le benedizioni… e vabbè, anche il file eventi."] },
  { art: "art/07-faro/", color: "#fff0b3", behind: true, down: 20, zoom: 1.08,
    lead: "Qui posso inebriarmi nella mia tossica ricerca di essere il più utile, gentile e perfetto faro per chiunque mi rivolga la parola.",
    body: ["Ma col tempo ho capito che ESN mi rispecchia davvero: nell'organizzazione, nell'accoglienza e nella balotta."] },
  { art: "art/08-crime-night/", color: "#ffd23f", behind: true, textAt: "swap light",
    lead: "Tengo compagnia e poco più al karaoke, speak, e ufficio.",
    body: ["Ma il mio posto sono i tandem. Sono felicissimo di quello che i siti hanno portato alla serata: meno lavoro, giochi più chiari, e un segnale per gli Erasmus che ci teniamo davvero."] },
  { art: "art/09-cannone/", color: "#ff6b5e", behind: true, zoom: 1.15, textAt: "light",
    lead: "Per questo infilo la testa nel cannone umano",
    body: ["e mi punto verso la posizione di responsabile tandem e di webmaster, per portare quello che so fare, e il mio sorriso, lì dove volontari ed Erasmus si incontrano."] },
  { art: "art/10-ragnatele/", color: "#d6cfbf", behind: true, textAt: "lower",
    lead: "(E magari, finalmente, mandiamo in pensione quel vecchissimo Jupiter e il pagamento con bonifico :P)",
    body: [] },
  { art: "art/11-bacio/", color: "#ff4b4b",
    lead: "Vi voglio bene stronzi",
    body: ["So di poter dare ancora tanto a questa sezione, e come sapete non ho paura di farmi avanti."] },
];
