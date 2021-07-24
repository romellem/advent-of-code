const { input, sampleInputs } = require('./input');
const { Maze } = require('./maze');

let maze = new Maze(input);
maze.setupPartTwo();
console.log(maze.grid.toString());
process.exit(1);
// const [first_entrance] = [...maze.entrances.values()];

const start = new Date();
const paths = maze.getShortestPath();
console.log(`Took ${new Date() - start}ms`);
console.log(paths);
