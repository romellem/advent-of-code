const { Computer } = require('./intcode-computer.js');
const { InfiniteGrid } = require('./infinite-grid.js');

class TractorBeam {
	constructor(memory, options = {}) {
		this.memory = memory.slice(0);
		this.grid = new InfiniteGrid({ string_map: { 1: '#', 0: '.' } });
	}

	partOne() {
		for (let x = 0; x < 50; x++) {
			for (let y = 0; y < 50; y++) {
				let output = this.computeAt(x, y);

				this.grid.set(x, y, output);
			}
		}

		return this.grid.sum();
	}

	partTwo(square_size = 100) {
		/**
		 * First, we need to find when the tractor beam begins after the origin.
		 * We do this by diagonalizing from 1,0 (or 0,1) until we hit 1 (being pulled).
		 * Rather than just following a simple `y = x` line from the origin, we diagonalize
		 * because the "slope" may be thin enough to not add pulled markers near the origin
		 * (as I see with my puzzle input).
		 */
		this.grid.set(0, 0, 1);
		let start;
		let col = 1;
		let x = 1;
		let y = 0;
		while (!start) {
			let output = this.computeAt(x, y);

			if (output === 1) {
				this.grid.set(x, y, 1);
				start = { x, y };
				break;
			}

			if (x === 0) {
				x = ++col;
				y = 0;
			} else {
				x--;
				y++;
			}
		}

		/**
		 * Once we have a start, we then mark two points, TOP and BOTTOM. Think of TOP
		 * as the top-right edge and BOTTOM as the bottom-left edge. If we can determine
		 * those values, we don't need to run the program for the points in between: we
		 * know they'll be filled in.
		 *
		 * TOP and BOTTOM will both start out at the same point. BOTTOM will then go down
		 * until we hit a `0` (more than likely will be after the first down move). When
		 * that happens, then move inward towards the right until we hit a `1`. That is
		 * the new BOTTOM edge.
		 *
		 * Similarly, for TOP, move down 1, then move right until we hit a `0`. The cell
		 * immediately to the left of that is the right edge.
		 */
		let top_edge = { ...start };
		let bottom_edge = { ...start };
		while (this.getWidth(bottom_edge, top_edge) < square_size) {
			this.calculateNewEdges(bottom_edge, top_edge);
		}

		/**
		 * Once we have a row that is wide enough, we can move onto the next phase.
		 * Take the left most point in the row (bottom_edge.x). Calculate the value
		 * at the point + `square_size` down from there. If we hit a `0`, go to B.
		 *
		 * If we hit a `1`, then move right `square_size` amount from that point.
		 * If _that_ is a `1`, we found our top-left point. Exit.
		 *
		 * B. If it's a `0`, then move inward `square_size - row_width` number of times,
		 * continually checking the point + `square_size` down. If we iterate through
		 * the available squares in the row, then the top-left point doesn't exist
		 * in that row. Calculate the next set of edges and start again.
		 */
		let found_square;
		while (!found_square) {
			const row_width = this.getWidth(bottom_edge, top_edge);
			for (
				let x = bottom_edge.x;
				x < bottom_edge.x + row_width - square_size;
				x++
			) {
				let y = bottom_edge.y + square_size;
				let output = this.computeAt(x, y);
				this.grid.set(x, y, output);
				if (output === 1) {
					let bottom_right = this.computeAt(x + square_size, y);
					if (bottom_right === 1) {
						found_square = { x, y: bottom_edge.y };
						break;
					}
				}
			}

			if (!found_square) {
				// Try the next row
				this.calculateNewEdges(bottom_edge, top_edge);
			}
		}

		// What value do you get if you take that
		// point's X coordinate, multiply it by 10000, then add the point's Y coordinate?
		console.log(found_square);
		return found_square.x * 10000 + found_square.y;
	}

	/**
	 * Updates edges in place.
	 */
	calculateNewEdges(bottom_edge, top_edge) {
		// First, move down until we hit 0
		let output;
		do {
			bottom_edge.y++;
			let computer = new Computer({
				memory: this.memory,
				inputs: [bottom_edge.x, bottom_edge.y],
			});
			[output] = computer.run();
			this.grid.set(bottom_edge.x, bottom_edge.y, output);
		} while (output === 1);

		// Then, move inward until we hit a `1`
		do {
			bottom_edge.x++;
			let computer = new Computer({
				memory: this.memory,
				inputs: [bottom_edge.x, bottom_edge.y],
			});
			[output] = computer.run();
			this.grid.set(bottom_edge.x, bottom_edge.y, output);
		} while (output === 0);

		// Now do top edge
		do {
			// Double loops in case bottom calc mo
			top_edge.y++;
			do {
				// Move right until we hit a `0`
				top_edge.x++;
				let computer = new Computer({
					memory: this.memory,
					inputs: [top_edge.x, top_edge.y],
				});
				[output] = computer.run();
				this.grid.set(top_edge.x, top_edge.y, output);
			} while (output === 1);
		} while (top_edge.y !== bottom_edge.y);

		// The cell immediately to the left of that is the right edge.
		top_edge.x--;
	}

	getWidth(bottom_edge, top_edge) {
		return top_edge.x - bottom_edge.x + 1;
	}

	computeAt(x, y) {
		// The computer halts after every output, so we create a new one each time
		let computer = new Computer({ memory: this.memory, inputs: [x, y] });
		let [output] = computer.run();
		return output;
	}
}

module.exports = {
	TractorBeam,
};
