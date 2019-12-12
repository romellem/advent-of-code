const { input } = require('./input');
const Moons = require('./moons');

let system = new Moons(input);

console.log(system.orbitUntilRepeat());
