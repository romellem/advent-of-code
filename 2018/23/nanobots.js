const manhattan = require('./manhattan.js');

/**
 * @param {Array<import("./input.js").NanoBot>} bots
 */
function getInitialBounds(bots) {
	// Set initials bounds to first bot
	let b = bots[0];
	let min_x = b.pos[0] - b.r;
	let max_x = b.pos[0] + b.r;
	let min_y = b.pos[1] - b.r;
	let max_y = b.pos[1] + b.r;
	let min_z = b.pos[2] - b.r;
	let max_z = b.pos[2] + b.r;
	for (let bot of bots) {
		let b_min_x = bot.pos[0] - bot.r;
		let b_max_x = bot.pos[0] + bot.r;
		let b_min_y = bot.pos[1] - bot.r;
		let b_max_y = bot.pos[1] + bot.r;
		let b_min_z = bot.pos[2] - bot.r;
		let b_max_z = bot.pos[2] + bot.r;

		if (b_min_x < min_x) min_x = b_min_x;
		if (b_max_x > max_x) max_x = b_max_x;
		if (b_min_y < min_y) min_y = b_min_y;
		if (b_max_y > max_y) max_y = b_max_y;
		if (b_min_z < min_z) min_z = b_min_z;
		if (b_max_z > max_z) max_z = b_max_z;
	}

	return {
		min_x,
		max_x,
		min_y,
		max_y,
		min_z,
		max_z,
	};
}

function findGlobalMaxima(bots, steps = 100, top_n = 10) {
	debugger;
	let { min_x, max_x, min_y, max_y, min_z, max_z } = getInitialBounds(bots);

	// Points between `-1 to 1` is `|1 - -1| + 1 = 3` (e.g., {-1, 0, 1})
	let chunk_x = Math.floor(Math.abs(max_x - min_x) + 1 / steps);
	chunk_x = chunk_x % 2 === 1 ? chunk_x - 1 : chunk_x;
	let chunk_y = Math.floor(Math.abs(max_y - min_y) + 1 / steps);
	chunk_y = chunk_y % 2 === 1 ? chunk_y - 1 : chunk_y;
	let chunk_z = Math.floor(Math.abs(max_z - min_z) + 1 / steps);
	chunk_z = chunk_z % 2 === 1 ? chunk_z - 1 : chunk_z;
	let rx = chunk_x / 2;
	let ry = chunk_y / 2;
	let rz = chunk_z / 2;

	// Reuse arrays as optimization
	let point = [0, 0, 0];
	let top_points = Array(top_n).fill(0);

	for (let z = min_z; z < max_z; z += chunk_z) {
		for (let y = min_y; y < max_y; y += chunk_y) {
			for (let x = min_x; x < max_x; x += chunk_x) {
				// Center point of cuboid
				point[0] = x + rx;
				point[1] = y + ry;
				point[2] = z + rz;

				let bots_in_range = 0;
				for (let bot of bots) {
					let in_x = bot.pos[0] >= point[0] - rx && bot.pos[0] <= point[0] + rx;
					let in_y = bot.pos[1] >= point[1] - rx && bot.pos[1] <= point[1] + rx;
					let in_z = bot.pos[2] >= point[2] - rx && bot.pos[2] <= point[2] + rx;
					if (in_x && in_y && in_z) {
						bots_in_range++;
					}
				}

				let shift;
				for (let i = 0; i < top_n; i++) {
					let top = top_points[i];
					if (bots_in_range > top.in_range) {
						shift = i;
						break;
					}
				}
				if (shift !== undefined) {
					for (let i = top_n - 2; i > shift; i--) {
						top_points[i + 1] = top_points[i];
					}
					top_points[shift] = { pos: [point[0], point[1], point[2]], in_range: bots_in_range };
				}
			}
		}
	}

	console.log(top_points);
}

module.exports = {
	findGlobalMaxima,
}
