const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');
const PF = require('pathfinding');

const data = new InfiniteGrid();
data.load(input);

let grid = new PF.Grid(data.toGrid());

let finder = new PF.AStarFinder(/*
	{
		allowDiagonal: true,
		dontCrossCorners: true,
		heuristic: PF.Heuristic.chebyshev,
	}
*/);

// including both the start and end positions
let path = finder.findPath(from_x, from_y, to_x, to_y, grid.clone());

console.log(path.length - 1)