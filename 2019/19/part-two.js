const { input } = require('./input');
const { TractorBeam } = require('./tractor-beam');

let tractor_beam = new TractorBeam(input);
console.log(tractor_beam.partTwo());
// 9370819 - too high