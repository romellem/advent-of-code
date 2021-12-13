const { _ } = require('lodash');
const { input } = require('./input');
const { Graph } = require('./graph');

function isLowerCase(str) {
	return str === str.toLowerCase();
}

let graph = new Graph(input);
let paths = graph.getPaths('start', 'end', { visit_single_small_cave_twice: true });
// const correct_paths = paths.filter((path) => {
// 	let small_cave_map = path.reduce((map, cave) => {
// 		if (!isLowerCase(cave)) {
// 			return map;
// 		}

// 		if (!map.has(cave)) {
// 			map.set(cave, 0);
// 		}
// 		map.set(cave, map.get(cave) + 1);

// 		return map;
// 	}, new Map());

// 	let small_caves_visited_two_or_more_times_count = 0;
// 	for (let [cave, count] of small_cave_map) {
// 		if (count > 1) {
// 			small_caves_visited_two_or_more_times_count++;
// 		}
// 	}

// 	if (small_caves_visited_two_or_more_times_count > 1) {
// 		return false;
// 	} else {
// 		return true;
// 	}
// });

console.log(paths.length);
// console.log(correct_paths.length);

// 9151 too low
