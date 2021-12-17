const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

// 1378, too low
function findHighest(input) {
	// math by paper
	const INITIAL_XV = 11;
	// const INITIAL_XV = 6;

	const lowest = Math.min(...input.y);

	let initial_yv = 0;
	let yvs_that_work = [];

	let failures_in_a_row = 0;

	while (yvs_that_work.length === 0 || failures_in_a_row < 5) {
		let worked_this_time = false;
		// console.log(yvs_that_work);
		let xv = INITIAL_XV;
		let yv = initial_yv;

		let x = 0;
		let y = 0;

		while (y > lowest) {
			x += xv;
			y += yv;

			xv += xv === 0 ? 0 : xv > 0 ? -1 : 1;
			yv--;

			// console.log(
			// 	`[${x}, ${y}], moving (${xv > -1 ? '+' : ''}${xv}, ${yv > -1 ? '+' : ''}${yv})`
			// );

			if (x >= input.x[0] && x <= input.x[1] && y >= input.y[0] && y <= input.y[1]) {
				// console.log(`[${x}, ${y}] is in the target area`);
				yvs_that_work.push(initial_yv);
				failures_in_a_row = 0;
				worked_this_time = true;
			}
		}

		if (!worked_this_time) {
			failures_in_a_row++;
		}

		initial_yv++;
	}

	const highest_position = Math.max(...yvs_that_work);

	// Simulate the movement
	let xv = INITIAL_XV;
	let yv = highest_position;

	let x = 0;
	let y = 0;

	let max_y = 0;

	while (y > lowest) {
		x += xv;
		y += yv;

		if (y > max_y) {
			max_y = y;
		}

		xv += xv === 0 ? 0 : xv > 0 ? -1 : 1;
		yv--;

		// console.log(
		// 	`[${x}, ${y}], moving (${xv > -1 ? '+' : ''}${xv}, ${yv > -1 ? '+' : ''}${yv})`
		// );

		if (x >= input.x[0] && x <= input.x[1] && y >= input.y[0] && y <= input.y[1]) {
			break;
		}
	}

	console.log(max_y);
}

findHighest(input);
// findHighest({ x: [20, 30], y: [-10, -5] });
