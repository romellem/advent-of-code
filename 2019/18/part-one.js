const { sampleInputs } = require('./input');
const { Maze } = require('./maze');

let maze = new Maze(sampleInputs[0].maze);
console.log(maze.keys.size);
