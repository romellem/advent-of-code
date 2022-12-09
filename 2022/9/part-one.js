const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

let grid = new InfiniteGrid({ defaultFactory: () => `.` });
grid.set(0, 0, 's');

let head = [0, 0];
let tail = [0, 0];

let tail_visted = new Set([InfiniteGrid.toId(...tail)]);

for (let { dir, steps } of input) {
	for (let i = 0; i < steps; i++) {
		let previousHead = head;
		head = InfiniteGrid.moveInDirection(...head, dir);
		grid.set(...head, 'H');
		grid.set(...previousHead, '.');
		grid.set(...tail, '.');
		let neighbors = grid.neighbors(...head, true);
		let neighbor_ids = new Set(
			[...neighbors.values()].map((v) => v.id).concat(InfiniteGrid.toId(...head))
		);
		if (!neighbor_ids.has(InfiniteGrid.toId(...tail))) {
			// Move tail
			tail = previousHead;
			tail_visted.add(InfiniteGrid.toId(...tail));
		}

		grid.set(...tail, 'T');
		grid.set(0, 0, 's');
	}
}

console.log(tail_visted.size);
