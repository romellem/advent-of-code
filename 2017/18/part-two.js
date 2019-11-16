const { input, sampleParallelInput } = require('./input');
const assert = require('assert');
const ParallelPrograms = require('./parallel');

let test_program = new ParallelPrograms(sampleParallelInput);
let test_times_sent = test_program.orchestrateRun();
assert.strictEqual(test_times_sent, 3);

let program = new ParallelPrograms(input);
let times_sent = program.orchestrateRun();
console.log(times_sent);
