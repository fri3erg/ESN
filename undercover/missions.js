// The secret missions. Edit only this file to change them.
// kind 'say': make your target say this word. kind 'do': make your target do this.
// Each new target comes with a random mission, no repeats until every mission has been used.
// TODO: only the two examples from the brief for now; the organisers are choosing the real list.
export const KINDS = { say: 'MAKE THEM SAY', do: 'MAKE THEM DO' };

export const MISSIONS = [
  { id: 'dog', kind: 'say', text: 'Dog', emoji: '🐶' },
  { id: 'cartwheel', kind: 'do', text: 'A cartwheel', emoji: '🤸' },
];
