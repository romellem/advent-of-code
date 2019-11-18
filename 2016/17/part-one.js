const assert = require('assert');
const { input, sampleInputs } = require('./input');
const { Room } = require('./room');

for (let [solution_path, starting_passcode] of sampleInputs) {
	const test_room = new Room(starting_passcode);
	const test_path = test_room.getShortestPath();
	console.log(`${starting_passcode} -> ${test_path}`);

	assert.strictEqual(test_path, solution_path);
}

const room = new Room(input);
const path = room.getShortestPath();
console.log(path);