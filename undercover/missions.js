// The secret missions, from the organisers' list (undercover.pdf, 2026-11-13). Edit only this file to change them.
// kind 'say': make your target say this word. kind 'do': make your target do this (text reads after "Make them…").
// Each new target comes with a random mission, no repeats until every mission has been used.
export const KINDS = { say: 'MAKE THEM SAY', do: 'MAKE THEM…' };

export const MISSIONS = [
  { id: 'shrek', kind: 'say', text: 'Shrek', emoji: '🟢' },
  { id: 'squats', kind: 'do', text: 'Do 3 squats', emoji: '🏋️' },
  { id: 'tinder', kind: 'say', text: 'Tinder', emoji: '🔥' },
  { id: 'handshake', kind: 'do', text: 'Invent a secret handshake with you', emoji: '🤝' },
  { id: 'banana', kind: 'say', text: 'Banana', emoji: '🍌' },
  { id: 'selfie', kind: 'do', text: 'Take a selfie with you', emoji: '🤳' },
  { id: 'ex', kind: 'say', text: 'Ex-boyfriend', emoji: '💔' },
  { id: 'animal', kind: 'do', text: 'Imitate an animal', emoji: '🐒' },
  { id: 'joke', kind: 'do', text: 'Tell you a joke', emoji: '😂' },
  { id: 'pizza', kind: 'say', text: 'Pizza', emoji: '🍕' },
  { id: 'spin', kind: 'do', text: 'Spin around three times', emoji: '🌀' },
  { id: 'sexy', kind: 'say', text: 'Sexy', emoji: '😏' },
  { id: 'dance-move', kind: 'do', text: 'Teach you a traditional dance move from their country', emoji: '💃' },
  { id: 'hangover', kind: 'say', text: 'Hangover', emoji: '🥴' },
  { id: 'heart', kind: 'do', text: 'Make a heart shape with their hands', emoji: '🫶' },
  { id: 'mamma-mia', kind: 'say', text: 'Mamma mia', emoji: '🤌' },
  { id: 'rps', kind: 'do', text: 'Challenge you to rock-paper-scissors', emoji: '✊' },
  { id: 'toilet', kind: 'say', text: 'Toilet', emoji: '🚽' },
  { id: 'dance', kind: 'do', text: 'Dance for at least 5 seconds', emoji: '🕺' },
  { id: 'marry-me', kind: 'say', text: 'Marry me', emoji: '💍' },
  { id: 'high-five', kind: 'do', text: 'Give you a high five', emoji: '🙌' },
  { id: 'native', kind: 'do', text: 'Speak in their native language for 10 seconds', emoji: '🗣️' },
  { id: 'funny-face', kind: 'do', text: 'Make a funny face', emoji: '🤪' },
  { id: 'two-truths', kind: 'do', text: 'Tell you two truths and one lie', emoji: '🤥' },
];

// The whole mission as one sentence, e.g. for the Telegram message.
export const sentence = m => (m.kind === 'say' ? `Make your target say "${m.text}"` : `Make your target ${m.text[0].toLowerCase()}${m.text.slice(1)}`);
