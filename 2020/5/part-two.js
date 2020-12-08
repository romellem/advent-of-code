const { input } = require('./input');
const { binarySpacePartitionToSeatId } = require('./plane');

let sorted_seat_ids = input.map((v) => binarySpacePartitionToSeatId(v)).sort((a, b) => a - b);
let min_id = sorted_seat_ids[0];

/**
 * Start at the lowest ID and start incrementing up.
 * The first ID that is different means we skipped our
 * seat, so log out the expected ID as its the one that
 * is missing, and thus our seat ID.
 */
let expected_id = min_id;
for (let seat_id of sorted_seat_ids) {
	if (seat_id !== expected_id) {
		console.log('Your seat ID is:', expected_id);
		break;
	}
	expected_id++;
}
