// Numbers 1–90 in words, so the staff can shout them in any language.

const IT_UNITS = ['', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove',
  'dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'];
const IT_TENS = ['', '', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta'];

function it(n) {
  if (n < 20) return IT_UNITS[n];
  const u = n % 10;
  let tens = IT_TENS[Math.floor(n / 10)];
  if (u === 1 || u === 8) tens = tens.slice(0, -1); // ventuno, ventotto
  return tens + (u === 3 ? 'tré' : IT_UNITS[u]);
}

const EN_UNITS = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const EN_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function en(n) {
  if (n < 20) return EN_UNITS[n];
  const u = n % 10;
  return EN_TENS[Math.floor(n / 10)] + (u ? `-${EN_UNITS[u]}` : '');
}

const ES_SMALL = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
  'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve',
  'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
const ES_TENS = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];

function es(n) {
  if (n < 30) return ES_SMALL[n];
  const u = n % 10;
  return ES_TENS[Math.floor(n / 10)] + (u ? ` y ${ES_SMALL[u]}` : '');
}

export const words = (n, lang) => ({ it, en, es }[lang] || it)(n);
