const assert = require('assert');
const PF = require('pathfinding');
const { sampleInput, input } = require('./input');
const { genMazeFromNumber, getMazeAsString } = require('./maze');

let [start_x, start_y] = input.start;

// Create a 52 by 52 maze (if we went straight
// right or down, further we could get would be
// [52, 1] or [1, 52] if we start at [1, 1])
const max_steps = 50;
const size = max_steps + Math.max(start_x, start_y) + 5;

let grid = genMazeFromNumber(input.num, size);

let visited = {};
for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
        if (!(x === 1 && y === 1)) {
            let cell = grid[y][x];

            // If cell is open, see how long it'll take to reach it 
            if (cell === 0) {
                let maze = new PF.Grid(JSON.parse(JSON.stringify(grid)));
                let finder = new PF.DijkstraFinder();
                let path = finder.findPath(start_x, start_y, x, y, maze);

                // `length - 1` because path includes [1, 1] as the first step.
                // We don't want to count that.
                if (path.length - 1 <= max_steps) {
                    // Mark the [x, y] coord as visited
                    path.forEach(([x, y]) => visited[`${x},${y}`] = true);
                }
            }
        }
    }
}

// Count how many [x, y] coords we visited
// (this is different that number of paths we can go that are less than 50 in length)
console.log(Object.keys(visited).length);
