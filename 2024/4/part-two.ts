import { input, type Grid } from './input';

const N = 'N';
const NE = 'NE';
const E = 'E';
const SE = 'SE';
const S = 'S';
const SW = 'SW';
const W = 'W';
const NW = 'NW';

type Directions =
	| typeof N
	| typeof NE
	| typeof E
	| typeof SE
	| typeof S
	| typeof SW
	| typeof W
	| typeof NW;

const vectors = new Map<Directions, [number, number]>([
	[N, [-1, 0]],
	[NE, [-1, 1]],
	[E, [0, 1]],
	[SE, [1, 1]],
	[S, [1, 0]],
	[SW, [1, -1]],
	[W, [0, -1]],
	[NW, [-1, -1]],
]);

function get(grid: Grid, x: number, y: number, delta?: [number, number]): string | undefined {
	return grid[y + (delta?.[1] ?? 0)]?.[x + (delta?.[0] ?? 0)];
}

function isMatch(grid: Grid, x: number, y: number): boolean {
	const cellNE = get(grid, x, y, vectors.get(NE));
	const cellSW = get(grid, x, y, vectors.get(SW));

	const cellNW = get(grid, x, y, vectors.get(NW));
	const cellSE = get(grid, x, y, vectors.get(SE));

	// prettier-ignore
	return (
		[cellNE, cellSW].sort().join('') === 'MS' &&
		[cellNW, cellSE].sort().join('') === 'MS'
	);
}

function countMatches(grid: Grid): number {
	let matches = 0;
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			const cell = grid[y][x];
			if (cell === 'A') {
				if (isMatch(grid, x, y)) {
					matches++;
				}
			}
		}
	}

	return matches;
}

const answer = countMatches(input);
console.log(answer);
