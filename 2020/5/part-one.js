const { input } = require('./input');
const { binarySpacePartitionToSeatId } = require('./plane');

let seat_ids = input.map((v) => binarySpacePartitionToSeatId(v));
let max_id = -Number.MAX_SAFE_INTEGER;
for (let seat_id of seat_ids) {
	if (seat_id > max_id) {
		max_id = seat_id;
	}
}

console.log(max_id);
