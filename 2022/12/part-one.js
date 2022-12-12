const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

const a = 'a'.charCodeAt(0);
const S = 0;
const E = 'z'.charCodeAt(0) - a + 1 + 1;
const grid = new InfiniteGrid({
	load: input,
	parseAs: (char) => (char === 'S' ? S : char === 'E' ? E : char.charCodeAt(0) - a + 1),
});

let [start] = grid.findAll(S);
let [end] = grid.findAll(E);

let [start_x, start_y] = start[1];
let [end_x, end_y] = end[1];

let qqq = grid.getShortestElevationPath(start_x, start_y, end_x, end_y);

console.log(qqq.length - 1);
