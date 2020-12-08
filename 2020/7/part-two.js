const assert = require('assert');
const { input, sampleInputs } = require('./input');
const { Luggage } = require('./bags');

for (let sampleInput of sampleInputs) {
	let sample_luggage = new Luggage(sampleInput.input);
	let sample_part_two = sample_luggage.countChildrenInside('shiny gold');
	if (sampleInput.partTwo !== undefined) {
		assert.strictEqual(sample_part_two, sampleInput.partTwo);
	}
}

let luggage = new Luggage(input);
let shiny_child_count = luggage.countChildrenInside('shiny gold');
console.log(shiny_child_count);
