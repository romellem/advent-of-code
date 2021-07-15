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
}

module.exports = {
	TractorBeam,
};
