const faker = require('faker');

// faker.locale = 'ru';
const _streets = Array.from(new Set(new Array(100000).fill().map(()=>faker.address.streetName()))).sort();

function prepareTree(streets) {
    // подготовим дерево глубиной две буквы для superElaborateSolution'а
    const tree = {}
    for (street of streets) {
      let i;
      for (i = 0; i < street.length-1; i++) {
        const letter = street[i].toLowerCase();
        const nextLetter = street[i + 1].toLowerCase();
    
        if (!tree[letter]) {
          tree[letter] = {
            subtree: {},
            streets: [],
          };
        }
        tree[letter].streets.push(street);
    
        if (!tree[letter].subtree[nextLetter]) {
          tree[letter].subtree[nextLetter] = [];
        }
        tree[letter].subtree[nextLetter].push(street);
      }
      const letter = street[i].toLowerCase();
      if (!tree[letter]) {
        tree[letter] = {
          subtree: {},
          streets: [],
        };
      }
    
      tree[letter].streets.push(street);
    }
    return tree;
}

module.exports = { _streets, prepareTree };
