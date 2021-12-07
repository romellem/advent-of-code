const { input } = require('./input');
const Circuit = require('./circuit');

let circuit = new Circuit(input);

console.log(circuit.gates['a'].getValue());
