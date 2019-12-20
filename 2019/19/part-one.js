const { input } = require('./input');
const { TractorBeam } = require('./intcode-computer');

let tractor_beam = new TractorBeam(input);
tractor_beam.partOne();
