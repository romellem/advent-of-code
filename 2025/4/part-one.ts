import { input, PAPER, type Paper, type Empty } from './input';
import { Grid } from './grid';

type CellType = Paper | Empty;

const grid = new Grid<CellType>(input);

function countCells(cells: Array<CellType | undefined>, cellType: CellType): number {
	let count = 0;
	for (let cell of cells) {
		if (cell === cellType) {
			count++;
		}
	}
	return count;
}

let rollsAccessibleByForklift: Array<[number, number]> = [];
for (let cell of grid.cells()) {
	if (cell.value !== PAPER) {
		continue;
	}

	const paperNeighbors = countCells(
		grid.getNeighbors(cell.x, cell.y, Grid.eightCardinalDirections),
		PAPER
	);

	if (paperNeighbors < 4) {
		rollsAccessibleByForklift.push([cell.x, cell.y]);
	}
}

console.log('Part 1:', rollsAccessibleByForklift.length);
