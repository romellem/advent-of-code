const assert = require('assert');
const { input, sampleInputs } = require('./input');
const { Luggage } = require('./bags');

for (let sampleInput of sampleInputs) {
	let sample_luggage = new Luggage(sampleInput.input);
	let sample_part_one = sample_luggage.bags_lookup['shiny gold'].countUniqueParents();
	if (sampleInput.partOne !== undefined) {
		assert.strictEqual(sample_part_one, sampleInput.partOne);
	}
}

let luggage = new Luggage(input);
let shiny_gold = luggage.bags_lookup['shiny gold'];
console.log(shiny_gold.countUniqueParents());
