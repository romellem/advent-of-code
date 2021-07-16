class Simulation {
	constructor(map) {
		this.original_map_str = JSON.stringify(map);
		this.map = JSON.parse(this.original_map_str);
		this.seen = new Set([this.original_map_str]);
	}

	// getValue(x, y) {
	// 	return this.map[y]?.[x] ?? 0;
	// }

	mapToString() {
		return JSON.stringify(this.map);
	}

	logVisual() {
		let str = '';
		for (let y = 0; y < this.map.length; y++) {
			for (let x = 0; x < this.map[y].length; x++) {
				let cell = this.map[y][x] ? '#' : '.';
				str += cell;
			}
			str += '\n';
		}
		console.log(str);
	}

	getNeighborsSum(x, y) {
		let sum = 0;
		sum += this.map[y]?.[x + 1] ?? 0;
		sum += this.map[y]?.[x - 1] ?? 0;
		sum += this.map[y + 1]?.[x] ?? 0;
		sum += this.map[y - 1]?.[x] ?? 0;
		return sum;
	}

	tick() {
		let dies = [];
		let infested = [];
		for (let y = 0; y < this.map.length; y++) {
			for (let x = 0; x < this.map[y].length; x++) {
				// - A bug dies (becoming an empty space) unless
				//   there is exactly one bug adjacent to it.
				// - An empty space becomes infested with a bug if
				//   exactly one or two bugs are adjacent to it.
				let cell = this.map[y][x];
				let neighbors = this.getNeighborsSum(x, y);
				if (cell && neighbors !== 1) {
					dies.push([x, y]);
				}
				if (!cell && (neighbors === 1 || neighbors === 2)) {
					infested.push([x, y]);
				}
			}
		}

		for (let [x, y] of dies) {
			this.map[y][x] = 0;
		}
		for (let [x, y] of infested) {
			this.map[y][x] = 1;
		}
	}

	reset() {
		this.seen = new Set();
		this.map = JSON.parse(this.original_map_str);
	}

	runUntilSeen() {
		// this.logVisual();
		let map_str = this.mapToString();
		do {
			this.seen.add(map_str);
			this.tick();
			// this.logVisual();
			map_str = this.mapToString();
		} while (!this.seen.has(map_str));

		return this.getBiodiversityRating();
	}

	getBiodiversityRating() {
		let sum = 0;
		let count = 0;
		for (let y = 0; y < this.map.length; y++) {
			for (let x = 0; x < this.map[y].length; x++) {
				let power = Math.pow(2, count++);
				let cell = this.map[y][x];
				sum += cell * power;
			}
		}

		return sum;
	}
}

module.exports = {
	Simulation,
};
