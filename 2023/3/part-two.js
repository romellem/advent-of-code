const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

// Parse out whole numbers from the input and track their position in the grid
function getNums(input) {
	const grid = InfiniteGrid.split(input);
	let inNumber = false;
	let currentNumStr = '';
	function popNum(numX, numY) {
		const currentNumber = parseInt(currentNumStr, 10);
		// const numX = x - currentNumStr.length;
		const numId = InfiniteGrid.toId(numX, numY);
		numMap.set(numId, currentNumber);
		inNumber = false;
		currentNumStr = '';
	}

	const numMap = new Map();

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			const char = grid[y][x];
			if (/\d/.test(char)) {
				// Concat the char
				currentNumStr += char;
				inNumber = true;
			} else if (inNumber) {
				const numX = x - currentNumStr.length;
				popNum(numX, y);
			}
		}

		// If we were still in a number after parsing this row, make sure to pop it off
		if (inNumber) {
			// We were at the end of the row, so calc x position from that
			const numX = grid[y].length - currentNumStr.length;
			popNum(numX, y);
		}
	}

	return numMap;
}

const nums = getNums(input);
const grid = new InfiniteGrid({ load: input });

const partNums = [];

// Loop through all the numbers to see which are "part" numbers
for (let [id, num] of nums) {
	const coord = InfiniteGrid.toCoords(id);
	// Get coords of each digit
	const cells = String(num)
		.split('')
		.map((_, i) => [coord[0] + i, coord[1]]);

	const symbolsMap = new Map();
	const neighbors = cells.map(([x, y]) => grid.neighbors(x, y, true));
	const someNeighborIsSymbol = neighbors.some((group) => {
		return [...group.values()].some(({ id, coord, value }) => {
			const isSymbol = /[^\.\d]/.test(value);
			if (isSymbol) {
				// Save symbol and its coordinates at the same time in this loop (why not?)
				symbolsMap.set(value, coord);
			}
			return /[^\.\d]/.test(value);
		});
	});

	const symbolCoord = [...symbolsMap];

	if (symbolCoord.length > 1) {
		console.error('More than one symbol is a neighbor of the number, breaking an assumption');
		console.error(symbolCoord);
		process.exit(1);
	}

	if (someNeighborIsSymbol) {
		partNums.push({ id, num, symbolCoord: symbolCoord.flat() });
	}
}

const counts = new Map();

for (let {
	numStartId,
	num,
	symbolCoord: [sym, [sx, sy]],
} of partNums) {
	if (sym === '*') {
		const sid = InfiniteGrid.toId(sx, sy);
		const arr = counts.has(sid) ? counts.get(sid) : [];
		counts.set(sid, arr);
		arr.push([num, numStartId]);
	}
}

const ratios = [...counts.values()]
	.filter((v) => v.length === 2)
	.map((v) => v.map((x) => x[0]).reduce((a, b) => a * b));

console.log(ratios.reduce((a, b) => a + b, 0));
