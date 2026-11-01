// The Tandem Passport missions (from the ESN Bologna event guide). Edit the wording here, nothing else.
// stamp: short text on the sticker; ink: sticker colour; input: the mission asks to save what they learned.
export const MISSIONS = [
  {
    id: 'word', emoji: '🌐', title: 'Word Exchange', stamp: 'WORD EXCHANGE', ink: '#3a86ff',
    text: 'Ask someone for a funny or useful word in their mother tongue and save it in your passport.',
    starter: "What's your favourite untranslatable word?",
    input: true,
  },
  {
    id: 'bologna', emoji: '🍝', title: 'Bologna Check', stamp: 'BOLOGNA CHECK', ink: '#fb5607',
    text: 'Find someone who recommends a typical Bolognese dish they tried recently.',
    starter: 'What local dish should I definitely try?',
  },
  {
    id: 'travel', emoji: '✈️', title: 'Travel Map', stamp: 'TRAVEL MAP', ink: '#06a77d',
    text: "Find someone who has been to a country you've never visited and get a tip from them.",
    starter: 'What place should I put on my bucket list?',
  },
  {
    id: 'culture', emoji: '🎉', title: 'Culture Swap', stamp: 'CULTURE SWAP', ink: '#ff006e',
    text: 'Get someone from another country to tell you about a special holiday or tradition.',
    starter: 'Tell me about a cool holiday from your country.',
  },
  {
    id: 'same', emoji: '🤝', title: 'Same Same?', stamp: 'SAME SAME?', ink: '#8338ec',
    text: 'Find someone who shares an unusual, niche interest or hobby with you.',
    starter: 'What weird topic or hobby are you into?',
  },
  {
    id: 'teach', emoji: '🗣️', title: 'Teach Me!', stamp: 'TEACH ME!', ink: '#0096c7',
    text: 'Teach someone a phrase in your language and learn a simple one from them.',
    starter: 'Teach me how to say hello in your language!',
  },
];
