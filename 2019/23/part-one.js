const { input } = require('./input');
const { Network } = require('./network');

let network = new Network(input);
console.log(network.partOne());
