import { input, PAPER, EMPTY, type Paper, type Empty } from './input';
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

let rollsRemoved = 0;
let rollsAccessibleByForklift: Array<[number, number]> = [];

do {
	// Purge accessible rolls
	for (let [x, y] of rollsAccessibleByForklift) {
		rollsRemoved++;
		grid.set(x, y, EMPTY);
	}

	rollsAccessibleByForklift = [];

	for (let cell of grid.cellsImpure()) {
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
} while (rollsAccessibleByForklift.length > 0);

console.log('Part 2:', rollsRemoved);
