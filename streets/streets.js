const { randomLengthWord } = require('../utils');
const { _streets, prepareTree } = require('./prepareStreets');


function headlongRegexpSolution(streets, input) {
  // решение в лоб с регулярками
  const re = new RegExp(`.*${input}.*`, 'i');
  return streets.filter(s => re.test(s)).slice(0, 10);
}

function headlongSolution(streets, _input) {
  // решение в лоб через indexOf
  const input = _input.toLowerCase();
  return streets.filter(s => s.toLowerCase().includes(input)).slice(0, 10);
}

function elaborateRegexpSolution(streets, _input) {
  // решение "отбором" с регулярками
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

function elaborateSolution(streets, _input) {
  // решение отбором через indexOf
  // самое быстрое из простых решений
  // (хоть и незначительно)
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

function superElaborateSolution(tree, _input) {
  // решение с использованием заранее приготовленного 
  const input = _input.toLowerCase();
  switch (input.length) {
    case 0:
      return [];
    case 1:
      if (tree[input]) {
        return elaborateSolution(tree[input].streets, '');
      }
    default:
      if (tree[input[0]] && tree[input[0]].subtree[input[1]]) {
        return elaborateSolution(tree[input[0]].subtree[input[1]], input.slice(2));
      }
      return [];
  }
}

const cases = new Array(256);
  
for (let i = 0; i < cases.length; i++) {
  cases[i] = randomLengthWord(10);
}

for (repeat of [ 0, 1, 2 ]) {
  for (streets of [ _streets.slice(0,1024), _streets.slice(0,4096), _streets.slice(0,8192), _streets ]) {
    console.log('                                                  ');
    console.log('==================================================');
    console.log(`+++++++++ улиц: ${streets.length} ++++++++++++++++`);
    console.log('==================================================');
    console.log('число повторов:', 2**repeat * cases.length);
    console.log('                                                  ');
  
    const tree = prepareTree(streets);
    
    console.time('SUPER elaborate solution');
    for (let i = 0; i < 2**repeat; i++) {
      for (input of cases) {
          superElaborateSolution(tree, input);
      }
    }
    console.timeEnd('SUPER elaborate solution');
    
    console.time('elaborate solution');
    for (let i = 0; i < 2**repeat; i++) {
      for (input of cases) {
        elaborateSolution(streets, input);
      }
    }
    console.timeEnd('elaborate solution');
  
    console.time('elaborate regexp solution');
    for (let i = 0; i < 2**repeat; i++) {
      for (input of cases) {
        elaborateRegexpSolution(streets, input);
      }
    }
    console.timeEnd('elaborate regexp solution');

    console.time('headlong solution');
    for (let i = 0; i < 2**repeat; i++) {
      for (input of cases) {
        headlongSolution(streets, input);
      }
    }
    console.timeEnd('headlong solution');
  
    console.time('headlong regexp solution');
    for (let i = 0; i < 2**repeat; i++) {
      for (input of cases) {
        headlongRegexpSolution(streets, input);
      }
    }
    console.timeEnd('headlong regexp solution');
  }
}


module.exports = { headlongSolution, elaborateSolution, headlongRegexpSolution, elaborateRegexpSolution };
