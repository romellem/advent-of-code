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

function isMatch(
	grid: Grid,
	x: number,
	y: number,
	chars: string[],
	vector: [number, number]
): boolean {
	for (let char of chars) {
		let cell = grid[y]?.[x];
		if (cell !== char) {
			return false;
		}
		let [dx, dy] = vector;
		x += dx;
		y += dy;
	}

	return true;
}

function countMatches(grid: Grid, chars: string[]): number {
	let matches = 0;
	const [firstChar] = chars;
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			const cell = grid[y][x];
			if (cell === firstChar) {
				for (let vector of vectors.values()) {
					if (isMatch(grid, x, y, chars, vector)) {
						matches++;
					}
				}
			}
		}
	}

	return matches;
}

const answer = countMatches(input, 'XMAS'.split(''));
console.log(answer);
