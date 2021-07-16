const { input } = require('./input');
const { Network } = require('./network');

let network = new Network(input);
let net_packet = network.run();
console.log(net_packet);
