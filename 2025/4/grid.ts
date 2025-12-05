/**
 * Remaking my grid class *without* infinite support. Hoping to simplify some things
 */

type NestedArray<T> = Array<Array<T>>;

const DIRECTIONS = {
	N: [0, -1],
	NE: [1, -1],
	E: [1, 0],
	SE: [1, 1],
	S: [0, 1],
	SW: [-1, 1],
	W: [-1, 0],
	NW: [-1, -1],
} as const;
const { N, NE, E, SE, S, SW, W, NW } = DIRECTIONS;
type EnumDirections = keyof typeof DIRECTIONS;

type CellLookup<TCell> = { x: number; y: number; value: TCell | undefined };

export class Grid<TCell = string | number> {
	grid: NestedArray<TCell>;

	static fourCardinalTuples = [N, E, S, W] as const;
	static fourCardinalDirections = ['N', 'E', 'S', 'W'] as const;
	static eightCardinalTuples = [N, NE, E, SE, S, SW, W, NW] as const;
	static eightCardinalDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;
	static DIRECTIONS = DIRECTIONS;

	constructor(grid: NestedArray<TCell>) {
		this.grid = structuredClone(grid);
	}

	inBounds(x: number, y: number): boolean {
		return x >= 0 && x < this.grid[0].length && y >= 0 && y < this.grid.length;
	}

	set(x: number, y: number, value: TCell): void {
		if (!this.inBounds(x, y)) {
			throw new Error('Invalid bounds for Grid.set', { cause: { x, y } });
		}

		this.grid[y][x] = value;
	}

	get(x: number, y: number): TCell | undefined {
		return this.grid[y]?.[x];
	}

	getNeighbors(
		x: number,
		y: number,
		directions: ReadonlyArray<EnumDirections>
	): Array<undefined | TCell> {
		return directions.map((dir) => {
			const [dx, dy] = DIRECTIONS[dir];
			return this.get(x + dx, y + dy);
		});
	}

	*cells() {
		for (let y = 0; y < this.grid.length; y++) {
			for (let x = 0; x < this.grid[y].length; x++) {
				const cell: Readonly<CellLookup<TCell>> = {
					x,
					y,
					value: this.get(x, y),
				};

				yield cell;
			}
		}
	}

	static parse2d(gridStr: string): NestedArray<string> {
		return gridStr
			.trim()
			.split('\n')
			.map((row) => row.split(''));
	}
}
