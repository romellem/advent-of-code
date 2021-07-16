const { input } = require('./input');
const { TractorBeam } = require('./tractor-beam');

let tractor_beam = new TractorBeam(input);
let answer = tractor_beam.partOne();
console.log(tractor_beam.grid.toString());
console.log(answer);
