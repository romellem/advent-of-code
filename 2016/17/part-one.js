const assert = require('assert');
const { input, sampleInputs } = require('./input');
const { Room } = require('./room');

for (let [solution_path, starting_passcode] of sampleInputs) {
	const test_room = new Room(starting_passcode);
	const test_path = test_room.getShortestPath();
	console.log(`${starting_passcode} ->\n\t${test_path}`);

	if (test_path !== solution_path) {
		console.log('oops, should be ', solution_path);
	}
}

const room = new Room(input);
const path = room.getShortestPath();
console.log(path);