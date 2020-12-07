const { input, sampleInput } = require('./input');
const { Luggage } = require('./bags');

let luggage = new Luggage(input);
let shiny_gold = luggage.bags_lookup['shiny gold'];
console.log(shiny_gold.countUniqueParents());