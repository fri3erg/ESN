// The Tandem Passport missions (from the ESN Bologna event guide). Edit the wording here, nothing else.
// stamp: short text on the sticker; ink: sticker colour.
// fields: what they write down before stamping; the first one is required, the others are optional.
export const MISSIONS = [
  {
    id: 'word', emoji: '🌐', title: 'Word Exchange', stamp: 'WORD EXCHANGE', ink: '#3a86ff',
    text: 'Ask someone for a funny or useful word in their mother tongue and save it in your passport.',
    starter: "What's your favourite untranslatable word?",
    fields: [{ key: 'word', label: 'THEIR WORD', required: true }, { key: 'meaning', label: 'WHAT IT MEANS (OPTIONAL)' }],
  },
  {
    id: 'bologna', emoji: '🍝', title: 'Bologna Check', stamp: 'BOLOGNA CHECK', ink: '#fb5607',
    text: 'Find someone who recommends a typical Bolognese dish they tried recently.',
    starter: 'What local dish should I definitely try?',
    fields: [{ key: 'dish', label: 'THE DISH THEY RECOMMEND', required: true }, { key: 'where', label: 'WHERE TO EAT IT (OPTIONAL)' }],
  },
  {
    id: 'travel', emoji: '✈️', title: 'Travel Map', stamp: 'TRAVEL MAP', ink: '#06a77d',
    text: "Find someone who has been to a country you've never visited and get a tip from them.",
    starter: 'What place should I put on my bucket list?',
    fields: [{ key: 'country', label: 'THE COUNTRY', required: true }, { key: 'tip', label: 'THEIR TIP (OPTIONAL)' }],
  },
  {
    id: 'culture', emoji: '🎉', title: 'Culture Swap', stamp: 'CULTURE SWAP', ink: '#ff006e',
    text: 'Get someone from another country to tell you about a special holiday or tradition.',
    starter: 'Tell me about a cool holiday from your country.',
    fields: [{ key: 'tradition', label: 'THE HOLIDAY OR TRADITION', required: true }, { key: 'from', label: 'WHERE IT IS FROM (OPTIONAL)' }],
  },
  {
    id: 'same', emoji: '🤝', title: 'Same Same?', stamp: 'SAME SAME?', ink: '#8338ec',
    text: 'Find someone who shares an unusual, niche interest or hobby with you.',
    starter: 'What weird topic or hobby are you into?',
    fields: [{ key: 'common', label: 'WHAT YOU HAVE IN COMMON', required: true }, { key: 'who', label: 'THEIR NAME (OPTIONAL)' }],
  },
  {
    id: 'teach', emoji: '🗣️', title: 'Teach Me!', stamp: 'TEACH ME!', ink: '#0096c7',
    text: 'Teach someone a phrase in your language and learn a simple one from them.',
    starter: 'Teach me how to say hello in your language!',
    fields: [{ key: 'phrase', label: 'THE PHRASE YOU LEARNED', required: true }, { key: 'meaning', label: 'WHAT IT MEANS (OPTIONAL)' }],
  },
];
