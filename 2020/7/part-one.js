const { input, sampleInput } = require('./input');
const { Luggage } = require('./bags');

debugger;
let luggage = new Luggage(sampleInput);
let shiny_gold = luggage.bags_lookup['shiny gold'];
console.log(shiny_gold.countAllParents());