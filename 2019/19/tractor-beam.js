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
				// The computer halts after every output, so we create a new one each time
				let computer = new Computer({ memory: this.memory, inputs: [x, y] });
				let output = computer.run();

				this.grid.set(x, y, output.shift());
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
			// The computer halts after every output, so we create a new one each time
			let computer = new Computer({ memory: this.memory, inputs: [x, y] });
			let [output] = computer.run();

			if (output) {
				this.grid.set(x, y, 1);
				start = {x, y};
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
		let top_edge = {...start};
		let bottom_edge = {...start};
		while (top_edge.x - bottom_edge.x <= square_size) {
			this.calculateNewEdges(bottom_edge, top_edge);
		}
	}

	/**
	 * Updates edges in place.
	 */
	calculateNewEdges(bottom_edge, top_edge) {
		// First, move down until we hit 0
		let output;
		do {
			bottom_edge.y++;
			let computer = new Computer({ memory: this.memory, inputs: [bottom_edge.x, bottom_edge.y] });
			[output] = computer.run();
			this.grid.set(bottom_edge.x, bottom_edge.y, output);
		} while (output === 1);
		
		// Then, move inward until we hit a `1`
		do {
			bottom_edge.x++;
			let computer = new Computer({ memory: this.memory, inputs:  [bottom_edge.x, bottom_edge.y] });
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
				let computer = new Computer({ memory: this.memory, inputs: [top_edge.x, top_edge.y] });
				[output] = computer.run();
				this.grid.set(top_edge.x, top_edge.y, output);
			} while (output === 1);
		} while (top_edge.y !== bottom_edge.y);

		// The cell immediately to the left of that is the right edge.
		top_edge.x--;
	}
}

module.exports = {
	TractorBeam,
};
