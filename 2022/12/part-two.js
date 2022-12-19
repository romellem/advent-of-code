const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

const a = 'a'.charCodeAt(0);
const S = 0;
const E = 'z'.charCodeAt(0) - a + 1 + 1;
const grid = new InfiniteGrid({
	load: input,
	parseAs: (char) => (char === 'S' ? S : char === 'E' ? E : char.charCodeAt(0) - a + 1),
});

let starts = grid.findAll(1);
let [end] = grid.findAll(E);

let min = Number.MAX_VALUE;
for (let [, start] of starts) {
	let qqq = grid.getShortestElevationPath(...start, ...end[1]);
	if (qqq.length) {
		min = Math.min(min, qqq.length - 1);
	}
}

// let qqq = grid.getShortestElevationPath(start_x, start_y, end_x, end_y);

console.log(min);
