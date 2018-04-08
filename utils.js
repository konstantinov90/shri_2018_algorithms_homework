const alphabet = 'abcdefghijklmnopqrstuvwxyz ';

function randomNumber(n) {
  return Math.round(Math.random() * n)
}

function randomLetter() {
  return alphabet[randomNumber(alphabet.length-1)];
}

function randomLengthWord(l) {
  return (new Array(randomNumber(l))).fill().map(() => randomLetter()).join('');
}

function randomWord(l) {
  return (new Array(l)).fill().map(() => randomLetter()).join('');
}

module.exports = { randomNumber, randomLetter, randomWord, randomLengthWord };
