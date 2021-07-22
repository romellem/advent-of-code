const { sampleInputs } = require('./input');
const { Maze } = require('./maze');

let maze = new Maze(sampleInputs[3].maze);
const [first_entrance] = [...maze.entrances.values()];

const start = new Date();
const paths = maze.getShortestPath(...first_entrance);
console.log(`Took ${new Date() - start}ms`);
console.log(paths[0]);
