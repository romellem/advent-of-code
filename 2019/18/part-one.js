const { input, sampleInputs } = require('./input');
const { Maze } = require('./maze');

let maze = new Maze(input);
// let maze = new Maze(sampleInputs[3].maze);

const start = new Date();
const paths = maze.getShortestPath();
console.log(`Took ${new Date() - start}ms`);
console.log(paths[0]);
