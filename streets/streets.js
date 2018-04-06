const _streets = require('./streets.json');
const { randomLengthWord } = require('../utils');

function headlongSolution(streets, _input) {
  const input = _input.toLowerCase();
  return streets.filter(s => s.toLowerCase().includes(input)).slice(0, 10);
}

function elaborateSolution(streets, _input) {
  const limit = 10;
  const input = _input.toLowerCase();
  const result = [];
  let found = 0;
  
  for (street of streets) {
    if (street.toLowerCase().includes(input)) {
      result[found++] = street;
      if (found === limit) {
        break
      }
    }
  }
  return result;
}

function headlongRegexpSolution(streets, input) {
  const re = new RegExp(`.*${input}.*`, 'i');
  return streets.filter(s => re.test(s)).slice(0, 10);
}

function elaborateRegexpSolution(streets, _input) {
  const limit = 10;
  const re = new RegExp(`.*${_input}.*`, 'i');
  const result = [];
  let found = 0;
  
  for (street of streets) {
    if (re.test(street)) {
      result[found++] = street;
      if (found === limit) {
        break
      }
    }
  }
  return result;
}

const cases = new Array(128);
  
for (let i = 0; i < cases.length; i++) {
  cases[i] = randomLengthWord(10);
}

for (repeat of [ 0, 3, 6 ]) {
  for (streets of [ _streets.slice(0,128), _streets.slice(0,512), _streets.slice(0,2048), _streets ]) {
    console.log('                                                  ');
    console.log('==================================================');
    console.log(`+++++++++ улиц: ${streets.length} ++++++++++++++++`);
    console.log('==================================================');
    console.log('число повторов:', 2**repeat * cases.length);
    console.log('                                                  ');
  
    
    console.time('headlong solution');
    for (let i = 0; i < 2**repeat; i++) {
      for (input of cases) {
        headlongSolution(streets, input);
      }
    }
    console.timeEnd('headlong solution');
    
    console.time('elaborate solution');
    for (let i = 0; i < 2**repeat; i++) {
      for (input of cases) {
        elaborateSolution(streets, input);
      }
    }
    console.timeEnd('elaborate solution');
  
    console.time('headlong regexp solution');
    for (let i = 0; i < 2**repeat; i++) {
      for (input of cases) {
        headlongRegexpSolution(streets, input);
      }
    }
    console.timeEnd('headlong regexp solution');
  
    console.time('elaborate regexp solution');
    for (let i = 0; i < 2**repeat; i++) {
      for (input of cases) {
        elaborateRegexpSolution(streets, input);
      }
    }
    console.timeEnd('elaborate regexp solution');
  }
}


module.exports = { headlongSolution, elaborateSolution, headlongRegexpSolution, elaborateRegexpSolution };
