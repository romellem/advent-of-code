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

		if (in_num) {
			// pop num
			numMap.set(InfiniteGrid.toId(tempGrid[y].length - num.length, y), +num);
			in_num = false;
			num = '';
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
	let sym = new Map();
	const testt = neighbors.some((group) => {
		return [...group.values()].some(({ id, coord, value }) => {
			let thing = /[^\.\d]/.test(value);
			if (thing) {
				sym.set(value, coord);
			}
			return thing;
		});
	});

	if (testt) {
		partNums.push([id, num, [...sym].flat()]);
	}
}

let counts = new Map();

for (let [numStartId, num, [sym, [sx, sy]]] of partNums) {
	if (sym === '*') {
		let sid = InfiniteGrid.toId(sx, sy);
		let arr;
		if (counts.has(sid)) {
			arr = counts.get(sid);
		} else {
			arr = [];
			counts.set(sid, arr);
		}
		arr.push([num, numStartId]);
	}
}
console.log(
	[...counts.values()]
		.filter((v) => v.length === 2)
		.map((v) => v.map((x) => x[0]).reduce((a, b) => a * b))
		.reduce((a, b) => a + b)
);

// console.log(JSON.stringify([...counts.values()]));

// console.log(nums);
// console.log(JSON.stringify(partNums));
