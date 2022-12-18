const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

let grid = new InfiniteGrid({ defaultFactory: () => `.` });
grid.set(0, 0, 's');

let head = [0, 0];
let tails = Array(9)
	.fill()
	.map(() => [0, 0]);
let tail = tails[tails.length - 1];

let tail_visted = new Set([InfiniteGrid.toId(0, 0)]);

for (let { dir, steps } of input) {
	for (let i = 0; i < steps; i++) {
		let previousHead = head;
		head = InfiniteGrid.moveInDirection(...head, dir);
		grid.set(...head, 'H');
		grid.set(...previousHead, '.');
		let knots = [head, ...tails];
		for (let c = 0; c < knots.length - 1; c++) {
			let current = knots[c];
			let next = knots[c + 1];
			let neighbors = grid.neighbors(...current, true);
			let neighbor_ids = new Set(
				[...neighbors.values()].map((v) => v.id).concat(InfiniteGrid.toId(...current))
			);

			if (!neighbor_ids.has(InfiniteGrid.toId(...next))) {
				// Move next knot
				let dirToMoveIn = InfiniteGrid.getDirFromTo(...next, ...current);
				if (dirToMoveIn) {
					let newCoords = InfiniteGrid.moveInDirection(...next, dirToMoveIn);
					grid.set(...next, '.');
					next[0] = newCoords[0];
					next[1] = newCoords[1];
					grid.set(...next, c);
				}

				if (next === tail) {
					tail_visted.add(InfiniteGrid.toId(...tail));
				}
			}
		}

		for (let k = knots.length - 1; k >= 0; k--) {
			let [x, y] = knots[k];
			grid.set(x, y, k === 0 ? 'H' : k);
		}
	}
}

console.log(tail_visted.size);
