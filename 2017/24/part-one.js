const assert = require('assert');
const { input, sampleInput } = require('./input');
const Bridges = require('./bridge');

let bridges = new Bridges(sampleInput);
bridges.printSolutions();
