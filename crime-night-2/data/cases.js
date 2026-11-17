// The cases of Mystery Night · Second Edition (International Dinner). DRAFT 2026-11-17: suspects and alibis
// still to be confirmed with the organisers.
// `clears` = suspects this clue gives an alibi to. `code` = word players read to each other.
// Every case must leave exactly `culprits` suspects not cleared, and no clue may be redundant (tests/data.test.mjs).
export const CASES = [
  {
    id: 1, culprits: 1,
    title: { en: 'The Carbonara Crime', it: 'Il Delitto della Carbonara', es: 'El Crimen de la Carbonara' },
    short: { en: 'Carbonara Crime', it: 'Delitto Carbonara', es: 'Crimen Carbonara' },
    crime: {
      en: 'At 21:00, while the guests were finding their seats, someone sneaked into the kitchen and poured an entire litre of CREAM into the carbonara. Three Italians at the dinner fainted on the spot, a fourth called his nonna in tears. The culprit left only an empty carton and a cloud of expensive perfume.',
      it: "Alle 21:00, mentre gli ospiti prendevano posto, qualcuno si è intrufolato in cucina e ha versato un litro intero di PANNA nella carbonara. Tre italiani presenti alla cena sono svenuti sul colpo, un quarto ha chiamato la nonna in lacrime. Il colpevole ha lasciato solo un cartone vuoto e una nuvola di profumo costoso.",
      es: 'A las 21:00, mientras los invitados buscaban su sitio, alguien se coló en la cocina y echó un litro entero de NATA en la carbonara. Tres italianos de la cena se desmayaron en el acto y un cuarto llamó llorando a su nonna. El culpable solo dejó un cartón vacío y una nube de perfume caro.',
    },
    clues: [
      { letter: 'A', clears: ['Elia', 'Leo'], code: 'MENU', text: {
        en: 'At 21:00, Elia and Leo were at the entrance: Elia was trying to get the Wi-Fi working for forty hungry guests, while Leo freestyled the entire menu to every table. Nobody asked him to. Everybody heard it.',
        it: "Alle 21:00 Elia e Leo erano all'ingresso: Elia cercava di far funzionare il Wi-Fi per quaranta ospiti affamati, mentre Leo rappava in freestyle l'intero menù a ogni tavolo. Nessuno gliel'aveva chiesto. Tutti l'hanno sentito.",
        es: 'A las 21:00, Elia y Leo estaban en la entrada: Elia intentaba que el Wi-Fi funcionara para cuarenta invitados hambrientos, mientras Leo rapeaba en freestyle todo el menú en cada mesa. Nadie se lo pidió. Todo el mundo lo oyó.' } },
      { letter: 'B', clears: ['Davide'], code: 'AUTOGRAPH', text: {
        en: "At 21:00, Davide was signing autographs for three Croatian students who swore he was Luka Modrić. He didn't deny it. The photos were on Instagram at 21:02.",
        it: 'Alle 21:00 Davide stava firmando autografi a tre studenti croati convinti che fosse Luka Modrić. Lui non ha smentito. Le foto erano su Instagram alle 21:02.',
        es: 'A las 21:00, Davide estaba firmando autógrafos a tres estudiantes croatas que juraban que era Luka Modrić. Él no lo negó. Las fotos estaban en Instagram a las 21:02.' } },
      { letter: 'C', clears: ['Sisto'], code: 'STORYTIME', text: {
        en: 'At 21:00, Sisto was telling a table of freshers about "the good old days of Erasmus, before smartphones". Twelve witnesses confirm it: they tried to leave, but he was only getting started.',
        it: 'Alle 21:00 Sisto stava raccontando a un tavolo di matricole "i bei tempi dell\'Erasmus, prima degli smartphone". Dodici testimoni lo confermano: hanno provato ad andarsene, ma lui era appena all\'inizio.',
        es: 'A las 21:00, Sisto le estaba contando a una mesa de novatos "los buenos tiempos del Erasmus, antes de los smartphones". Doce testigos lo confirman: intentaron irse, pero él acababa de empezar.' } },
      { letter: 'D', clears: ['Riccardo'], code: 'QUEUE', text: {
        en: 'At 21:00, Riccardo was in the bathroom queue, the longest queue in the history of the restaurant. Everyone in it remembers him: he kept letting people go first.',
        it: 'Alle 21:00 Riccardo era in fila per il bagno, la fila più lunga nella storia del ristorante. Tutti quelli in coda se lo ricordano: continuava a far passare gli altri.',
        es: 'A las 21:00, Riccardo estaba en la cola del baño, la cola más larga de la historia del restaurante. Todos los que estaban en ella lo recuerdan: no paraba de dejar pasar a los demás.' } },
    ],
  },
  {
    id: 2, culprits: 1,
    title: { en: 'The Tiramisù Vanishing', it: 'La Scomparsa del Tiramisù', es: 'La Desaparición del Tiramisú' },
    short: { en: 'Tiramisù Vanishing', it: 'Tiramisù Scomparso', es: 'Tiramisú Desaparecido' },
    crime: {
      en: 'At 22:30, just before dessert, the giant tray of tiramisù vanished from the kitchen. Fifty spoons were ready. Fifty people were waiting. All that was left was one coffee-stained spoon and a newspaper folded very, very neatly. Whoever did this knew exactly when the kitchen would be empty.',
      it: "Alle 22:30, poco prima del dolce, la teglia gigante di tiramisù è sparita dalla cucina. Cinquanta cucchiaini erano pronti. Cinquanta persone aspettavano. È rimasto solo un cucchiaino macchiato di caffè e un giornale piegato molto, molto ordinatamente. Chiunque sia stato sapeva esattamente quando la cucina sarebbe rimasta vuota.",
      es: 'A las 22:30, justo antes del postre, la bandeja gigante de tiramisú desapareció de la cocina. Había cincuenta cucharillas listas. Cincuenta personas esperando. Solo quedó una cucharilla manchada de café y un periódico doblado muy, muy cuidadosamente. Quien lo hizo sabía exactamente cuándo se quedaría vacía la cocina.',
    },
    clues: [
      { letter: 'A', clears: ['Dario', 'Davide'], code: 'PHOTOSHOOT', text: {
        en: 'At 22:30, Dario and Davide were at the photo corner. Dario was posing for "just one more photo", Davide was holding the phone. Thirty minutes and 214 photos later, all of them of Dario, they were still there.',
        it: 'Alle 22:30 Dario e Davide erano all\'angolo foto. Dario posava per "solo un\'altra foto", Davide teneva il telefono. Trenta minuti e 214 foto dopo, tutte di Dario, erano ancora lì.',
        es: 'A las 22:30, Dario y Davide estaban en el rincón de fotos. Dario posaba para "solo una foto más" y Davide sujetaba el móvil. Treinta minutos y 214 fotos después, todas de Dario, seguían allí.' } },
      { letter: 'B', clears: ['Elia'], code: 'HDMI', text: {
        en: 'At 22:30, Elia was lying under the projector, fixing the HDMI cable for the photo slideshow. The slideshow came back on at 22:31, and Elia only got up at 22:45.',
        it: 'Alle 22:30 Elia era sdraiato sotto il proiettore a sistemare il cavo HDMI per lo slideshow delle foto. Lo slideshow è ripartito alle 22:31, ed Elia si è rialzato solo alle 22:45.',
        es: 'A las 22:30, Elia estaba tumbado bajo el proyector arreglando el cable HDMI del pase de fotos. El pase volvió a funcionar a las 22:31, y Elia no se levantó hasta las 22:45.' } },
      { letter: 'C', clears: ['Leo'], code: 'PAELLA', text: {
        en: 'At 22:30, Leo was at the Spanish table in a very loud debate about whether paella with chorizo is a crime. In a Spain shirt, obviously. There is video evidence, and it is long.',
        it: 'Alle 22:30 Leo era al tavolo spagnolo in un dibattito molto acceso sul fatto che la paella con il chorizo sia un crimine. Con la maglia della Spagna, ovviamente. Esiste un video, ed è lungo.',
        es: 'A las 22:30, Leo estaba en la mesa española en un debate muy acalorado sobre si la paella con chorizo es un crimen. Con la camiseta de España, por supuesto. Hay pruebas en vídeo, y es largo.' } },
      { letter: 'D', clears: ['Riccardo'], code: 'DISHES', text: {
        en: 'At 22:30, Riccardo was washing dishes in the back because he lost a bet at rock-paper-scissors. The chef confirms he never left the sink, and that he did a suspiciously good job.',
        it: 'Alle 22:30 Riccardo stava lavando i piatti sul retro perché aveva perso una scommessa a sasso-carta-forbice. Lo chef conferma che non si è mai allontanato dal lavandino, e che ha fatto un lavoro sospettosamente buono.',
        es: 'A las 22:30, Riccardo estaba fregando platos en la parte de atrás porque perdió una apuesta a piedra, papel o tijera. El chef confirma que nunca se apartó del fregadero, y que lo hizo sospechosamente bien.' } },
    ],
  },
  {
    id: 3, culprits: 2,
    title: { en: 'The Pineapple Pizza Plot', it: "Il Complotto dell'Ananas", es: 'La Conspiración de la Piña' },
    short: { en: 'Pineapple Plot', it: 'Complotto Ananas', es: 'Conspiración Piña' },
    crime: {
      en: "At 23:15, every single pizza for the late-night round came out of the oven with PINEAPPLE on it. Nobody ordered pineapple. The pizzaiolo swears he looked away for two minutes, because someone very charming was asking him for a selfie. While one accomplice distracted him, the other swapped the toppings. Italy will never forgive this.",
      it: "Alle 23:15 ogni singola pizza del giro di mezzanotte è uscita dal forno con l'ANANAS sopra. Nessuno aveva ordinato ananas. Il pizzaiolo giura di essersi distratto solo due minuti, perché qualcuno di molto affascinante gli stava chiedendo un selfie. Mentre un complice lo distraeva, l'altro ha scambiato i condimenti. L'Italia non lo perdonerà mai.",
      es: 'A las 23:15, todas las pizzas de la ronda de medianoche salieron del horno con PIÑA. Nadie había pedido piña. El pizzero jura que solo apartó la vista dos minutos, porque alguien muy encantador le estaba pidiendo un selfie. Mientras un cómplice lo distraía, el otro cambió los ingredientes. Italia nunca lo perdonará.',
    },
    clues: [
      { letter: 'A', clears: ['Elia'], code: 'AIRPLANE', text: {
        en: "At 23:15, Elia was explaining to a group of guests why the game's QR code didn't work. It did work: their phones were in airplane mode. It took twenty minutes, and the guests confirm it.",
        it: 'Alle 23:15 Elia stava spiegando a un gruppo di ospiti perché il QR del gioco non funzionava. Funzionava eccome: avevano il telefono in modalità aereo. Ci sono voluti venti minuti, e gli ospiti lo confermano.',
        es: 'A las 23:15, Elia le estaba explicando a un grupo de invitados por qué el QR del juego no funcionaba. Sí funcionaba: tenían el móvil en modo avión. Tardó veinte minutos, y los invitados lo confirman.' } },
      { letter: 'B', clears: ['Davide'], code: 'HAIRSPRAY', text: {
        en: 'At 23:15, Davide was in the bathroom fixing his hair. "Blonde like this doesn\'t stay perfect on its own," he told the queue outside, which waited fifteen minutes and confirms every word.',
        it: 'Alle 23:15 Davide era in bagno a sistemarsi i capelli. "Un biondo così non resta perfetto da solo", ha detto alla fila fuori, che ha aspettato quindici minuti e conferma ogni parola.',
        es: 'A las 23:15, Davide estaba en el baño arreglándose el pelo. "Un rubio así no se queda perfecto solo", le dijo a la cola de fuera, que esperó quince minutos y confirma cada palabra.' } },
      { letter: 'C', clears: ['Sisto'], code: 'NAP', text: {
        en: 'At 23:15, Sisto had fallen asleep in an armchair, "at 23:00 sharp, like every night since 1987". His snoring appears in three different Instagram stories.',
        it: 'Alle 23:15 Sisto si era addormentato in poltrona, "alle 23:00 in punto, come ogni sera dal 1987". Il suo russare compare in tre storie Instagram diverse.',
        es: 'A las 23:15, Sisto se había quedado dormido en un sillón, "a las 23:00 en punto, como todas las noches desde 1987". Sus ronquidos aparecen en tres historias de Instagram distintas.' } },
      { letter: 'D', clears: ['Riccardo'], code: 'TAXI', text: {
        en: 'At 23:15, Riccardo was outside on the phone, calling a taxi for an Erasmus student who had lost their keys. The taxi company has the call recorded: all eleven minutes of it.',
        it: 'Alle 23:15 Riccardo era fuori al telefono a chiamare un taxi per uno studente Erasmus che aveva perso le chiavi. La compagnia dei taxi ha la chiamata registrata: tutti e undici i minuti.',
        es: 'A las 23:15, Riccardo estaba fuera al teléfono pidiendo un taxi para un estudiante Erasmus que había perdido las llaves. La compañía de taxis tiene la llamada grabada: los once minutos.' } },
    ],
  },
];
