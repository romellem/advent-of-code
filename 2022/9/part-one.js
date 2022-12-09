const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

let grid = new InfiniteGrid({ defaultFactory: () => `.` });
grid.set(0, 0, 's');

let head = [0, 0];
let tail = [0, 0];

let tail_visted = new Set(InfiniteGrid.toId(...tail));

for (let { dir, steps } of input) {
	for (let i = 0; i < steps; i++) {
		let previousHead = head;
		head = InfiniteGrid.moveInDirection(...head, dir);
		grid.set(...head, 'H');
		let neighbors = grid.neighbors(...head, true);
		if (!neighbors.has(InfiniteGrid.toId(...tail))) {
			// Move tail
			tail = previousHead;
			tail_visted.add(InfiniteGrid.toId(tail));
		}
	}
}

console.log(tail_visted.size);
