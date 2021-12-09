const { InfiniteGrid } = require('./infinite-grid');

const getLowPoints = (grid) => {
	const lows = [];
	for (let [id, cell] of grid) {
		const [x, y] = InfiniteGrid.toCoords(id);
		const neighbors = grid.neighbors(x, y);

		if ([...neighbors.values()].every(({ value }) => value > cell)) {
			lows.push({ x, y, cell });
		}
	}

	return lows;
};

const getBasins = (grid) => {
	const lows = getLowPoints(grid);
	const basins = [];
	for (let point of lows) {
		let queue = [point];
		let visited = new Set();
		visited.add(InfiniteGrid.toId(point.x, point.y));

		do {
			let cell = queue.shift();
			let n = grid.neighbors(cell.x, cell.y);
			for (let { coord, value } of n.values()) {
				let id = InfiniteGrid.toId(...coord);
				if (value < 9 && !visited.has(id)) {
					let [x, y] = coord;
					queue.push(id, { x, y, value });
					visited.add(id);
				}
			}
		} while (queue.length > 0);

		basins.push(visited);
	}

	// Sort largest to smallest
	basins.sort((a, b) => b.size - a.size);

	return basins;
};

module.exports = {
	getLowPoints,
	getBasins,
};
