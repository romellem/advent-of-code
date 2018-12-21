const fs = require('fs');
const path = require('path');
const Circuit = require('./circuit');

let raw_input = fs.readFileSync(path.resolve(__dirname, './input-part-two.txt'), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n);

let circuit = new Circuit(input);

console.log(circuit.gates['a'].getValue());
