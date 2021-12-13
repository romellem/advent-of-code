const { _ } = require('lodash');
const { input } = require('./input');
const { Graph } = require('./graph');

function isLowerCase(str) {
	return str === str.toLowerCase();
}

let graph = new Graph(input);
let paths = graph.getPaths('start', 'end', { visit_single_small_cave_twice: true });

console.log(paths.join('\n'));

console.log(paths.length);

// 9151 too low
