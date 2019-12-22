const { input } = require('./input');
const Deck = require('./deck');

let deck = new Deck(input);
let output = deck.shuffle();

console.log(output);