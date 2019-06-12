const { input, sampleInput } = require('./input');
const assert = require('assert');
const ParallelPrograms = require('./parallel');

let program = new ParallelPrograms(input);
let times_sent = program.orchestrateRun();
console.log(times_sent);
