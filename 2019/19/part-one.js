const { input } = require('./input');
const { TractorBeam } = require('./tractor-beam');

let tractor_beam = new TractorBeam(input);
console.log(tractor_beam.partOne());
console.log(tractor_beam.grid.toString());
