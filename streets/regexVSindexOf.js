const { randomWord } = require('../utils');


const haystacks = [];

for (let i = 0; i < 10; i ++) {
  haystacks.push(randomWord(2**i * 128));
}

const needles = [];

for (let i = 0; i < 10; i ++) {
  needles.push(randomWord(2**i));
}

for (haystack of haystacks) {
  for (needle of needles) {
    if (needle.length > haystack.length) {
      break;
    }
    const msg = `ищем иголку длиной ${needle.length} в стоге сена размером ${haystack.length}`;

    console.time(msg);

    const _needle = new RegExp(`.*${needle}.*`, 'i');

    let found;
    for (let i = 0; i < 20; i++) {
      // found = haystack.indexOf(needle) !== -1;
      if (process.env.NODE_MODE === 'regexp') {
        found = _needle.test(haystack);
      } else {
        found = haystack.includes(needle);
      }
    }

    console.timeEnd(msg);
    console.log(found ? 'иголка найдена' : 'увы!');
  }
}
