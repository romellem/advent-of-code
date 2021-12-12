const { input } = require('./input');
const { Graph } = require('./graph');

let graph = new Graph(input);
let paths = graph.getPaths('start', 'end', { visit_single_small_cave_twice: true });
console.log(paths.length);

// 9151 too low
