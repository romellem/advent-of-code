function binarySpacePartitionToSeatId(code) {
	let code_arr = code.split('');

	let low_row = 0;
	let high_row = 127;

	// First 7 char
	let rows = code_arr.slice(0, 7);
	let last_row_command = rows.pop();

	// Last 3 chars
	let cols = code_arr.slice(7);
	let last_col_command = cols.pop();
	for (let dir of rows) {
		// Seats `0 - 127` is 128 seats
		let seats = high_row - low_row + 1;
		let half = seats / 2;
		if (dir === 'F') {
			high_row -= half;
		} else {
			low_row += half;
		}
	}
	let row = last_row_command === 'F' ? low_row : high_row;

	let low_col = 0;
	let high_col = 7;
	for (let dir of cols) {
		let seats = high_col - low_col + 1;
		let half = seats / 2;
		if (dir === 'L') {
			high_col -= half;
		} else {
			low_col += half;
		}
	}
	let col = last_col_command === 'L' ? low_col : high_col;

	return row * 8 + col;
}

module.exports = { binarySpacePartitionToSeatId };
