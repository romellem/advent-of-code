const assert = require('assert');
const { input, sampleInputs } = require('./input');
const { Room } = require('./room');

for (let [, starting_passcode, solution_length] of sampleInputs) {
	const test_room = new Room(starting_passcode, false);
	const test_path_length = test_room.getLongestPathLength();
	console.log(`${starting_passcode} -> ${test_path_length}`);

	assert.strictEqual(test_path_length, solution_length);
}

const room = new Room(input, false);
const path_length = room.getLongestPathLength();
console.log(path_length);