// The Tandem Passport missions (from the ESN Bologna event guide). Edit the wording here, nothing else.
// stamp: short text on the ink stamp; ink: stamp colour; input: the mission asks to save what they learned.
export const MISSIONS = [
  {
    id: 'word', emoji: '🌐', title: 'Word Exchange', stamp: 'WORD EXCHANGE', ink: '#2e5aa8',
    text: 'Ask someone for a funny or useful word in their mother tongue and save it in your passport.',
    starter: "What's your favourite untranslatable word?",
    input: true,
  },
  {
    id: 'bologna', emoji: '🍝', title: 'Bologna Check', stamp: 'BOLOGNA CHECK', ink: '#b23a48',
    text: 'Find someone who recommends a typical Bolognese dish they tried recently.',
    starter: 'What local dish should I definitely try?',
  },
  {
    id: 'travel', emoji: '✈️', title: 'Travel Map', stamp: 'TRAVEL MAP', ink: '#2f7d4f',
    text: "Find someone who has been to a country you've never visited and get a tip from them.",
    starter: 'What place should I put on my bucket list?',
  },
  {
    id: 'culture', emoji: '🎉', title: 'Culture Swap', stamp: 'CULTURE SWAP', ink: '#7a3fa0',
    text: 'Get someone from another country to tell you about a special holiday or tradition.',
    starter: 'Tell me about a cool holiday from your country.',
  },
  {
    id: 'same', emoji: '🤝', title: 'Same Same?', stamp: 'SAME SAME?', ink: '#c0620c',
    text: 'Find someone who shares an unusual, niche interest or hobby with you.',
    starter: 'What weird topic or hobby are you into?',
  },
  {
    id: 'teach', emoji: '🗣️', title: 'Teach Me!', stamp: 'TEACH ME!', ink: '#1b6f7c',
    text: 'Teach someone a phrase in your language and learn a simple one from them.',
    starter: 'Teach me how to say hello in your language!',
  },
];
