const path = require("path");
const fs = require("fs");
const { InfiniteGrid } = require("./infinite-grid");

const grid_str = fs.readFileSync(path.join(__dirname, "grid.txt"), "utf8").toString();

let grid = new InfiniteGrid({
	defaultFactory: (x, y) => " ",
	walls: {
		"#": true,
	},
});
grid.import(grid_str);

let [, start_coords] = grid.find("X");
let [, end_coords] = grid.find("O");

let distance = grid.shortestDistance(start_coords, end_coords);
console.log(distance);

// let [, [start_x, start_y]] = found;
// let frontier = grid.buildFrontierFrom(start_x, start_y);

// let max_cell = { distance: 0 };
// for (let cell of frontier.values()) {
// 	if (cell.distance > max_cell.distance) {
// 		max_cell = cell;
// 	}
// }

// console.log(max_cell);
