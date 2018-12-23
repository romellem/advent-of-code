const input = require('./input');
const Cave = require('./cave');

let cave = new Cave(5616, [10, 785]);
// let cave = new Cave(510, [10, 10]);

// console.log(cave.printGrid(16, 16))

// console.log(JSON.stringify(cave.getGraphEdges(), null, '\t'));
console.log(JSON.stringify(cave.getGraphEdges()));