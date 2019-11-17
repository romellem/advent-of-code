const G = require('generatorics');
const PF = require('pathfinding');

class Grid {
	constructor(grid_str) {
		const grid_str_arr = grid_str.split('\n').map(row => row.split(''));
		this.grid_arr = grid_str_arr.map(row => row.map(v => (v === '#' ? 1 : 0)));
		this.grid = new PF.Grid(this.grid_arr);

		this.visits = {};
		for (let y = 0; y < grid_str_arr.length; y++) {
			const row = grid_str_arr[y];
			for (let x = 0; x < row.length; x++) {
				const cell = row[x];

				if (cell !== '#' && cell !== '.') {
					const index = parseInt(cell);
					this.visits[index] = [x, y];
				}
			}
		}
	}

	calculateShortestPathBetweenAllLocations(return_to_start = false) {
		// Get all locations minus the starting one
		const visits_arr = Object.keys(this.visits).map(v => parseInt(v)).filter(v => v !== 0);

		const permutations_without_start = G.clone.permutation(visits_arr);
		let possible_paths = [...permutations_without_start];

		// Add 0 to start of all paths
		possible_paths = possible_paths.map(path => [0].concat(path));

		if (return_to_start) {
			// End back at 0
			possible_paths = possible_paths.map(path => path.concat(0));
		}
		
		// Loop through all paths, compute distance between each point, and record those lengths
		const possible_distances = possible_paths.map(path => {
			// @note
			// > Be aware that grid will be modified in each path-finding, and will not be usable afterwards.
			// > If you want to use a single grid multiple times, create a clone for it before calling findPath.
			
			let total_distance = 0;
			for (let i = 0; i < path.length - 1; i++) {
				const spot_1 = path[i];
				const spot_2 = path[i + 1];
				const [x_1, y_1] = this.visits[spot_1];
				const [x_2, y_2] = this.visits[spot_2];

				const finder = new PF.AStarFinder();
				const grid = this.grid.clone();
				const complete_path = finder.findPath(x_1, y_1, x_2, y_2, grid);

				// Path includes starting point, which we don't want to count
				const distance = complete_path.length - 1;

				total_distance += distance;
			}

			return total_distance;
		});

		return Math.min.apply(null, possible_distances);
	}
}

module.exports = Grid;
