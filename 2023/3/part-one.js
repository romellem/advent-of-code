const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

function getNums() {
	let tempGrid = InfiniteGrid.split(input);
	let in_num = false;
	let num = '';
	let numMap = new Map();
	for (let y = 0; y < tempGrid.length; y++) {
		for (let x = 0; x < tempGrid[y].length; x++) {
			let v = tempGrid[y][x];
			if (/\d/.test(v)) {
				if (in_num) {
					num += v;
				} else {
					in_num = true;
					num = v;
				}
			} else {
				if (in_num) {
					// pop num
					numMap.set(InfiniteGrid.toId(x - num.length, y), +num);
					in_num = false;
					num = '';
				}
			}
		}
	}

	return numMap;
}

const nums = getNums();
const grid = new InfiniteGrid({ load: input });

let partNums = [];
for (let [id, num] of nums) {
	let coord = InfiniteGrid.toCoords(id);
	let cells = String(num)
		.split('')
		.map((_, i) => [coord[0] + i, coord[1]]);
	let neighbors = cells.map(([x, y]) => grid.neighbors(x, y, true));
	const testt = neighbors.some((group) => {
		return [...group.values()].some(({ id, coord, value }) => {
			let thing = /[^\.\d]/.test(value);
			return thing;
		});
	});

	if (testt) {
		partNums.push([id, num]);
	}
}

// for (let [val, [x, y]] of symbols) {
// 	const n = grid.neighbors(x, y, true);
// 	if ([...n.values()].some(({ id, coord, value }) => /\d/.test(value))) {
// 	}
// }

// console.log(nums);
console.log(partNums.reduce((sum, a) => sum + a[1], 0));
