const { sampleInputs } = require('./input');
const { Maze } = require('./maze');

let maze = new Maze(sampleInputs[0].maze);
const [first_entrance] = [...maze.entrances.values()];
const paths = maze.getShortestPath(...first_entrance)
console.log(paths);
