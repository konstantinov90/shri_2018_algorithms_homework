const fetch = require('node-fetch');

const { randomNumber } = require('../utils');
const Emitter = require('./Emitter');

const emitter = new Emitter();

function getYaRu() {
    return fetch('http://ya.ru')
        .then(res => res.text())
        .then(t => console.log(t));
}

function calculateRandomSum() {
    const arrSize = randomNumber(90) + 10; // случайное число от 10 до 100
    let sum = 0;
    for (let i = 0; i < arrSize; i++) {
        sum += Math.random();
    }
    console.log(sum);
};

emitter.on('event', getYaRu);
emitter.on('event', calculateRandomSum);

emitter.emit('event').then(() => {
    emitter.off('event', getYaRu);
    emitter.emit('event').then(() => {
        console.log('ok');
    });
});
