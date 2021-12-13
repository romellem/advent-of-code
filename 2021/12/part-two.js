const { input } = require('./input');
const { Graph } = require('./graph');

console.log('Calculating, this will take about 10 seconds...');
let graph = new Graph(input);
let paths = graph.getPaths('start', 'end', { visit_single_small_cave_twice: true });

console.log(paths.length);
