const { strictEqual } = require('assert');
const { input, sampleInputs } = require('./input');
const NightSky = require('./night-sky');

for (let { constellations, points } of sampleInputs) {
	const test_night_sky = new NightSky(points);
	strictEqual(test_night_sky.constellations.length, constellations);
}

const night_sky = new NightSky(input);
console.log(night_sky.constellations.length);
