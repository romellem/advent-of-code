function launch(initial_xv, initial_yv, input) {
	let xv = initial_xv;
	let yv = initial_yv;

	let x = 0;
	let y = 0;

	const lowest_y = Math.min(...input.y);
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
			return {
				max_y,
				xv: initial_xv,
				yv: initial_yv,
			};
		}
	}
}

function getValidTrajectories(input) {
	const lowest_y = Math.min(...input.y);
	const farthest_x = Math.max(...input.x);

	let solutions = [];
	for (let x = 0; x <= farthest_x + 1; x++) {
		for (let y = lowest_y; y <= 1000; y++) {
			let landed = launch(x, y, input);

			if (landed) {
				solutions.push(landed);
			}
		}
	}

	return solutions;
}

module.exports = {
	getValidTrajectories,
};
