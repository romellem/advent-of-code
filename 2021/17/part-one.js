const { input } = require('./input');

const lowest_y = Math.min(...input.y);
const farthest_x = Math.max(...input.x);

function launch(initial_xv, initial_yv) {
	let xv = initial_xv;
	let yv = initial_yv;

	let x = 0;
	let y = 0;

	let max_y = y;

	while (y > lowest_y) {
		x += xv;
		y += yv;

		if (y > max_y) {
			max_y = y;
		}

		xv += xv === 0 ? 0 : xv > 0 ? -1 : 1;
		yv--;

		if (x >= input.x[0] && x <= input.x[1] && y >= input.y[0] && y <= input.y[1]) {
			return max_y;
		}
	}

	return null;
}

let max_y = Number.MIN_SAFE_INTEGER;
for (let x = 0; x <= farthest_x + 1; x++) {
	for (let y = lowest_y; y <= 1000; y++) {
		let new_max_y = launch(x, y);

		if (max_y !== null) {
			max_y = Math.max(max_y, new_max_y);
		}
	}
}

console.log(max_y);
