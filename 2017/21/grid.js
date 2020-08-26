/**
 * Rotates a square 2d array 90 degrees clockwise in place
 * @link https://code.likeagirl.io/rotate-an-2d-matrix-90-degree-clockwise-without-create-another-array-49209ea8b6e6
 */
function rotate(matrix) {
	const n = matrix.length;
	const x = Math.floor(n / 2);
	const y = n - 1;
	for (let i = 0; i < x; i++) {
		for (let j = i; j < y - i; j++) {
			k = matrix[i][j];
			matrix[i][j] = matrix[y - j][i];
			matrix[y - j][i] = matrix[y - i][y - j];
			matrix[y - i][y - j] = matrix[j][y - i];
			matrix[j][y - i] = k;
		}
	}
}

/**
 * @param {Array<Array>} grid_rule
 * @param {Boolean} [reflect_y=false]
 * @returns {String}
 */
function joinGridRule(grid_rule, reflect_y = false) {
	/**
	 * Use loops and string concatentations to prevent intermediary arrays
	 * from being created, improving run-time.
	 *
	 * A cleaner, "one liner" might look like:
	 *
	 *     return (reflect_y
	 *         ? grid_rule.map((row) => row.join(''))
	 *         : grid_rule.map((row) => row.join('')).reverse()
	 *     ).join('/');
	 */

	let result = '';
	const processRow = (y) => {
		let row = '';
		for (let x = 0; x < grid_rule[y].length; x++) {
			row += grid_rule[y][x];
		}
		if (result) {
			result += '/' + row;
		} else {
			result += row;
		}
	};

	if (reflect_y) {
		for (let y = grid_rule.length - 1; y >= 0; y--) {
			processRow(y);
		}
	} else {
		for (let y = 0; y < grid_rule.length; y++) {
			processRow(y);
		}
	}

	return result;
}

/*

TRANSFORMATION EXAMPLES

0°   90°  180° 270°
--   ---  ---- ----
#.   ..   ..   .#
..   #.   .#   ..

y
--
..   #.   ..   ..
#.   ..   #.   .#

x
--
.#   ..   ..   #.
..   .#   #.   ..

0°    90°   180°  270°
--    ---   ----  ----
###   ##.   .#.   ..#
..#   #.#   #..   #.#
.#.   #..   ###   .##

y
--
.#.   #..   ###   .##
..#   #.#   #..   #.#
###   ##.   .#.   ..#

x
--
###   .##   .#.   #..
#..   #.#   ..#   #.#
.#.   ..#   ###   ##.

*/

/**
 * Given a "raw" rule string and a lookup object reference, split the
 * expansion output to an array, then save that array across all possible
 * transformations of the rule input.
 * @param {String} rule_raw - e.g. `../.. => ..#/#.#/###`
 * @param {Object} lookup - Applies all rules, including transformations, to the `lookup` in place
 * @example
 * {
 *   "#./..": [".#.", "#..", "###"],
 *   ...
 * }
 */
function applyTransformations(rule_raw, lookup) {
	let [rule_input, rule_output] = rule_raw.split(' => ');
	rule_output = rule_output.split('/');
	lookup[rule_input] = rule_output;
	let rule_input_grid = rule_input.split('/').map((row) => row.split(''));

	/**
	 * Can't find concrete math on this, but naturally there is a symmetry group
	 * going on here. After diong some rotation and reflections by hand, it looks
	 * like roating 0, 90, 180, and 270, plus reflecting each of those over any axis
	 * (whichever one is easier) will generate all possible states, with potential
	 * duplicates. Assigning those within my lookup will remove those duplicates
	 * automatically.
	 */
	for (let r = 0; r < 4; r++) {
		lookup[joinGridRule(rule_input_grid)] = rule_output;
		lookup[joinGridRule(rule_input_grid, true)] = rule_output;

		rotate(rule_input_grid);
	}

	// Useful for debugging, but not required since I'm updating the lookup in place
	return lookup;
}

function convertInputToRulesObject(input) {
	let rules_lookup = {};
	let rules = input.split('\n');

	for (let rule_raw of rules) {
		// Makes change to `rules_lookup` in place
		applyTransformations(rule_raw, rules_lookup);
	}

	return rules_lookup;
}

/**
 * Returns a 2d square array from a grid, given an x/y offset ([0,0] is the upper left corner)
 * @param {Array<Array>} grid
 * @param {Number} x_offset
 * @param {Number} y_offset
 * @param {Number} size Size of the subgrid to pick out
 * @returns {Array}
 */
function pickSubgrid(grid, x_offset, y_offset, size) {
	let subgrid = [];
	for (let y = y_offset; y < y_offset + size; y++) {
		let row = [];
		for (let x = x_offset; x < x_offset + size; x++) {
			row.push(grid[y][x]);
		}
		subgrid.push(row);
	}

	return subgrid;
}

/**
 * @param {Array<Array>} grid - A 2d grid of our '#' and '.' pixels
 * @param {Object} rules
 */
function expandGrid(grid, rules) {
	let new_grid = [];

	/**
	 * If divisible by 3, 3x3 -> 4x4
	 * If divisible by 2, 2x2 -> 3x3
	 */
	let intial_size = grid.length % 2 === 0 ? 2 : 3;
	let expansion_size = intial_size + 1;
	let chunks = Math.floor(grid.length / intial_size);

	// Need to iterate over x/y chunks
	for (let y_chunk = 0; y_chunk < chunks; y_chunk++) {
		let y_offset = y_chunk * intial_size;

		/**
		 * But, when saving our new grid, save cols as
		 * concatenated strings. So the rows need to be offset
		 * for the newly expanded array we are creating.
		 */
		let y_resized_offset = y_chunk * expansion_size;

		for (let x_chunk = 0; x_chunk < chunks; x_chunk++) {
			let x_offset = x_chunk * intial_size;
			let subgrid = pickSubgrid(grid, x_offset, y_offset, intial_size);
			let subgrid_as_rule = joinGridRule(subgrid);
			let expansion = rules[subgrid_as_rule];

			for (let y = 0; y < expansion.length; y++) {
				let expansion_row = expansion[y];
				if (new_grid[y_resized_offset + y] === undefined) {
					new_grid[y_resized_offset + y] = '';
				}

				new_grid[y_resized_offset + y] += expansion_row;
			}
		}
	}

	// `new_grid` is an array of strings, so split the strings to get a 2D array
	let final_new_grid = new_grid.map((row) => row.split(''));
	return final_new_grid;
}

// For the puzzle, starting point is always the same
const STARTING_GRID = `.#.
..#
###`
	.split('\n')
	.map((row) => row.split(''));

function iterativelyExpandGrid(input, iterations, grid = STARTING_GRID) {
	let rules = convertInputToRulesObject(input);
	for (let i = 0; i < iterations; i++) {
		let new_grid = expandGrid(grid, rules);
		grid = new_grid;
	}

	return grid;
}

function countPixelsInGrid(grid) {
	// Assumes a square grid
	let total_pixels = grid.length * grid.length;
	let pixels_on = grid
		.map((row) => row.reduce((sum, cell) => sum + (cell === '#' ? 1 : 0), 0))
		.reduce((a, b) => a + b);
	let pixels_off = total_pixels - pixels_on;

	return {
		pixels_on,
		pixels_off,
	};
}

module.exports = {
	STARTING_GRID,
	iterativelyExpandGrid,
	countPixelsInGrid,
};
