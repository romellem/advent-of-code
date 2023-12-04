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

	const neighbors = cells.map(([x, y]) => grid.neighbors(x, y, true));
	const someNeighborIsSymbol = neighbors.some((group) => {
		return [...group.values()].some(({ id, coord, value }) => {
			return /[^\.\d]/.test(value);
		});
	});

	if (someNeighborIsSymbol) {
		partNums.push({ id, num });
	}
}

console.log(partNums.reduce((sum, part) => sum + part.num, 0));
