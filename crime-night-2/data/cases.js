// The cases of Mystery Night · Second Edition (International Dinner, Zadaura, 18.11.2026).
// Culprits: case 1 Dario, case 2 Davide, case 3 Sisto + Leo (nobody is guilty twice).
// `clears` = suspects this clue gives an alibi to. `code` = word players read to each other.
// Every case must leave exactly `culprits` suspects not cleared, and no clue may be redundant (tests/data.test.mjs).
export const CASES = [
  {
    id: 1, culprits: 1,
    title: { en: 'The Carbonara Crime', it: 'Il Crimine della Carbonara', es: 'El Crimen de la Carbonara' },
    short: { en: 'Carbonara Crime', it: 'Crimine Carbonara', es: 'Crimen Carbonara' },
    crime: {
      en: 'At 21:00, while the guests were finding their seats, someone sneaked into the kitchen and poured an entire litre of CREAM into the carbonara. Three Italians at the dinner fainted on the spot, a fourth called his nonna in tears. The culprit left only an empty carton, a cloud of expensive perfume and the kitchen door politely held open for the next person.',
      it: "Alle 21:00, mentre gli ospiti prendevano posto, qualcuno si è intrufolato in cucina e ha versato un litro intero di PANNA nella carbonara. Tre italiani presenti alla cena sono svenuti sul colpo, un quarto ha chiamato la nonna in lacrime. Il colpevole ha lasciato solo un cartone vuoto, una nuvola di profumo costoso e la porta della cucina gentilmente tenuta aperta per chi veniva dopo.",
      es: 'A las 21:00, mientras los invitados buscaban su sitio, alguien se coló en la cocina y echó un litro entero de NATA en la carbonara. Tres italianos de la cena se desmayaron en el acto y un cuarto llamó llorando a su nonna. El culpable solo dejó un cartón vacío, una nube de perfume caro y la puerta de la cocina amablemente abierta para el siguiente.',
    },
    clues: [
      { letter: 'A', clears: ['Elia', 'Leo'], code: 'MENU', text: {
        en: 'At 21:00, Elia and Leo were at the entrance: Elia was trying to get the Wi-Fi working for forty hungry guests, while Leo freestyled the entire menu to every table. Nobody asked him to. Everybody heard it.',
        it: "Alle 21:00 Elia e Leo erano all'ingresso: Elia cercava di far funzionare il Wi-Fi per quaranta ospiti affamati, mentre Leo rappava in freestyle l'intero menù a ogni tavolo. Nessuno gliel'aveva chiesto. Tutti l'hanno sentito.",
        es: 'A las 21:00, Elia y Leo estaban en la entrada: Elia intentaba que el Wi-Fi funcionara para cuarenta invitados hambrientos, mientras Leo rapeaba en freestyle todo el menú en cada mesa. Nadie se lo pidió. Todo el mundo lo oyó.' } },
      { letter: 'B', clears: ['Davide'], code: 'AUTOGRAPH', text: {
        en: "At 21:00, Davide was signing autographs for three Croatian students who swore he was Luka Modrić. He didn't deny it.",
        it: 'Alle 21:00 Davide stava firmando autografi a tre studenti croati convinti che fosse Luka Modrić. Lui non ha smentito.',
        es: 'A las 21:00, Davide estaba firmando autógrafos a tres estudiantes croatas que juraban que era Luka Modrić. Él no lo negó.' } },
      { letter: 'C', clears: ['Sisto'], code: 'PEARL', text: {
        en: 'At 21:00, Sisto was sitting at the freshers\' table in complete silence. After forty minutes he said one single sentence, and the whole table applauded. Twelve witnesses are still thinking about it.',
        it: 'Alle 21:00 Sisto era seduto al tavolo delle matricole in silenzio assoluto. Dopo quaranta minuti ha detto una sola frase, e tutto il tavolo ha applaudito. Dodici testimoni ci stanno ancora pensando.',
        es: 'A las 21:00, Sisto estaba sentado en la mesa de los novatos en completo silencio. Después de cuarenta minutos dijo una sola frase, y toda la mesa aplaudió. Doce testigos siguen pensando en ella.' } },
      { letter: 'D', clears: ['Riccardo'], code: 'NESSUN DORMA', text: {
        en: 'At 21:00, Riccardo was asked to sing "just one note" to test the microphone. He sang the whole of Nessun Dorma. Forty guests filmed it, two of them cried.',
        it: 'Alle 21:00 a Riccardo hanno chiesto di cantare "solo una nota" per provare il microfono. Ha cantato tutto Nessun Dorma. Quaranta ospiti l\'hanno filmato, due hanno pianto.',
        es: 'A las 21:00, le pidieron a Riccardo que cantara "solo una nota" para probar el micrófono. Cantó el Nessun Dorma entero. Cuarenta invitados lo grabaron, dos lloraron.' } },
    ],
  },
  {
    id: 2, culprits: 1,
    title: { en: 'The Tiramisù Theft', it: 'Il Tiramisù Trafugato', es: 'El Timo del Tiramisú' },
    short: { en: 'Tiramisù Theft', it: 'Tiramisù Trafugato', es: 'Timo del Tiramisú' },
    crime: {
      en: 'At 22:30, just before dessert, the giant tray of tiramisù vanished from the kitchen. Fifty spoons were ready. Fifty people were waiting. All that was left was one coffee-stained spoon with a single, perfect, very BLOND hair on it. A waiter swears he heard someone in the dark whisper "Modrić would never share".',
      it: 'Alle 22:30, poco prima del dolce, la teglia gigante di tiramisù è sparita dalla cucina. Cinquanta cucchiaini erano pronti. Cinquanta persone aspettavano. È rimasto solo un cucchiaino macchiato di caffè con sopra un unico capello perfetto, e molto BIONDO. Un cameriere giura di aver sentito qualcuno al buio sussurrare "Modrić non la dividerebbe mai".',
      es: 'A las 22:30, justo antes del postre, la bandeja gigante de tiramisú desapareció de la cocina. Había cincuenta cucharillas listas. Cincuenta personas esperando. Solo quedó una cucharilla manchada de café con un único pelo perfecto y muy RUBIO. Un camarero jura que oyó a alguien susurrar en la oscuridad "Modrić nunca lo compartiría".',
    },
    clues: [
      { letter: 'A', clears: ['Dario', 'Sisto'], code: 'STAIRS', text: {
        en: 'At 22:30, Dario was helping Sisto down the restaurant stairs, one step at a time, like a true gentleman. It took fifteen minutes. Sisto did not say a word the whole way down, then at the bottom: "Thank you, young man." Dario is still moved.',
        it: 'Alle 22:30 Dario stava aiutando Sisto a scendere le scale del ristorante, un gradino alla volta, da vero gentiluomo. Ci sono voluti quindici minuti. Sisto non ha detto una parola per tutta la discesa, poi in fondo: "Grazie, giovanotto." Dario è ancora commosso.',
        es: 'A las 22:30, Dario estaba ayudando a Sisto a bajar las escaleras del restaurante, escalón a escalón, como un auténtico caballero. Tardaron quince minutos. Sisto no dijo ni una palabra en toda la bajada, y abajo: "Gracias, joven." Dario sigue emocionado.' } },
      { letter: 'B', clears: ['Elia'], code: 'HDMI', text: {
        en: 'At 22:30, Elia was lying under the projector, fixing the HDMI cable for the photo slideshow. The slideshow came back on at 22:31, and Elia only got up at 22:45.',
        it: 'Alle 22:30 Elia era sdraiato sotto il proiettore a sistemare il cavo HDMI per lo slideshow delle foto. Lo slideshow è ripartito alle 22:31, ed Elia si è rialzato solo alle 22:45.',
        es: 'A las 22:30, Elia estaba tumbado bajo el proyector arreglando el cable HDMI del pase de fotos. El pase volvió a funcionar a las 22:31, y Elia no se levantó hasta las 22:45.' } },
      { letter: 'C', clears: ['Leo'], code: 'PAELLA', text: {
        en: 'At 22:30, Leo was at the Spanish table in a very loud debate about whether paella with chorizo is a crime. In a Spain shirt, obviously. There is video evidence, and it is long.',
        it: 'Alle 22:30 Leo era al tavolo spagnolo in un dibattito molto acceso sul fatto che la paella con il chorizo sia un crimine. Con la maglia della Spagna, ovviamente. Esiste un video, ed è lungo.',
        es: 'A las 22:30, Leo estaba en la mesa española en un debate muy acalorado sobre si la paella con chorizo es un crimen. Con la camiseta de España, por supuesto. Hay pruebas en vídeo, y es largo.' } },
      { letter: 'D', clears: ['Riccardo'], code: 'SERENADE', text: {
        en: 'At 22:30, Riccardo was outside on the terrace singing an opera serenade to a table of Erasmus students who had dared him to. The neighbours called to complain at 22:34. Then they asked for an encore.',
        it: 'Alle 22:30 Riccardo era fuori in terrazza a cantare una serenata lirica a un tavolo di Erasmus che l\'avevano sfidato. I vicini hanno chiamato per lamentarsi alle 22:34. Poi hanno chiesto il bis.',
        es: 'A las 22:30, Riccardo estaba fuera en la terraza cantando una serenata de ópera a una mesa de Erasmus que le habían retado. Los vecinos llamaron para quejarse a las 22:34. Luego pidieron un bis.' } },
    ],
  },
  {
    id: 3, culprits: 2,
    title: { en: 'The Pineapple Pizza Plot', it: "Il Complotto dell'Ananas", es: 'La Conspiración de la Piña' },
    short: { en: 'Pineapple Plot', it: 'Complotto Ananas', es: 'Conspiración Piña' },
    crime: {
      en: "At 23:15, every single pizza for the late-night round came out of the oven with PINEAPPLE on it. Nobody ordered pineapple. The pizzaiolo swears he looked away for only two minutes: a quiet old man had told him one sentence so wise that he had to sit down and think about his life. While one accomplice distracted him, the other swapped the toppings, humming a Spanish song. Italy will never forgive this.",
      it: "Alle 23:15 ogni singola pizza del giro di mezzanotte è uscita dal forno con l'ANANAS sopra. Nessuno aveva ordinato ananas. Il pizzaiolo giura di essersi distratto solo due minuti: un signore silenzioso gli aveva detto una frase così saggia che si è dovuto sedere a riflettere sulla sua vita. Mentre un complice lo distraeva, l'altro ha scambiato i condimenti canticchiando una canzone spagnola. L'Italia non lo perdonerà mai.",
      es: 'A las 23:15, todas las pizzas de la ronda de medianoche salieron del horno con PIÑA. Nadie había pedido piña. El pizzero jura que solo apartó la vista dos minutos: un señor callado le había dicho una frase tan sabia que tuvo que sentarse a pensar en su vida. Mientras un cómplice lo distraía, el otro cambió los ingredientes tarareando una canción española. Italia nunca lo perdonará.',
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
      { letter: 'C', clears: ['Dario'], code: 'JACKET', text: {
        en: 'At 23:15, Dario was outside giving his jacket to an Erasmus student who was cold, then walking her to the bus stop. A passer-by stopped him to ask which magazine he models for. Three witnesses, one very grateful student.',
        it: 'Alle 23:15 Dario era fuori a prestare la giacca a una studentessa Erasmus che aveva freddo, e poi ad accompagnarla alla fermata del bus. Un passante l\'ha fermato per chiedergli per quale rivista fa il modello. Tre testimoni, una studentessa molto grata.',
        es: 'A las 23:15, Dario estaba fuera dejándole su chaqueta a una estudiante Erasmus que tenía frío, y luego acompañándola a la parada del bus. Un transeúnte lo paró para preguntarle para qué revista hace de modelo. Tres testigos y una estudiante muy agradecida.' } },
      { letter: 'D', clears: ['Riccardo'], code: 'PIKACHU', text: {
        en: 'At 23:15, Riccardo was in the park across the street, chasing a shiny Pikachu on Pokémon GO. The app logged his position 300 metres away, and the waiter who went to fetch him got the whole Pokédex explained.',
        it: 'Alle 23:15 Riccardo era nel parco di fronte a inseguire un Pikachu shiny su Pokémon GO. L\'app ha registrato la sua posizione a 300 metri, e il cameriere andato a chiamarlo si è sentito spiegare tutto il Pokédex.',
        es: 'A las 23:15, Riccardo estaba en el parque de enfrente persiguiendo un Pikachu shiny en Pokémon GO. La app registró su posición a 300 metros, y al camarero que fue a buscarlo le explicó toda la Pokédex.' } },
    ],
  },
];
