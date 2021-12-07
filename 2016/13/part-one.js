const assert = require('assert');
const PF = require('pathfinding');
const { sampleInput, input } = require('./input');
const { genMazeFromNumber, getMazeAsString } = require('./maze');

/**
 * Tests
 */

let test_size = Math.max(...sampleInput.finish);

// Create a map that is twice the size of the largest ending coord.
// This is just a guess, most likely this will create enough cells for us to solve.
test_size *= 2;

let test_maze_grid = genMazeFromNumber(sampleInput.num, test_size);
let test_maze = new PF.Grid(test_maze_grid);
let test_finder = new PF.DijkstraFinder();

let [test_start_x, test_start_y] = sampleInput.start;
let [test_end_x, test_end_y] = sampleInput.finish;
let test_path = test_finder.findPath(test_start_x, test_start_y, test_end_x, test_end_y, test_maze);

// Path includes the first spot, which shouldn't count
assert.strictEqual(test_path.length - 1, sampleInput.steps);
// console.log(getMazeAsString(test_maze_grid, test_path));

/**
 * Real input
 */

let size = Math.max(...input.finish);
size *= 3;

let maze_grid = genMazeFromNumber(input.num, size);
let maze = new PF.Grid(maze_grid);
let finder = new PF.DijkstraFinder();

let [start_x, start_y] = input.start;
let [end_x, end_y] = input.finish;
let path = finder.findPath(start_x, start_y, end_x, end_y, maze);

// console.log(getMazeAsString(maze_grid, path));
console.log(path.length - 1);
