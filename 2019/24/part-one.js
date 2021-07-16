const { input, sampleInput } = require('./input');
const { Simulation } = require('./simulation');

let sim = new Simulation(input);
console.log(sim.runUntilSeen());
