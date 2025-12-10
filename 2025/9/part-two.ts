import { input } from './input';

type Point = { x: number; y: number };

type OriginalNumber = number;
type MappedIndex = number;

/**
 * The trick for the whole thing, this implements "coordinate compression"
 * on the original grid. With a compressed grid, we can more easily fill
 * in the grid with "empty" tiles to differentiate between red/green tiles.
 * After that filling, we can also more quickly check if a given rectangle
 * fully contains tiles
 */
class CompressedGrid {
	tiles: Point[];
	compressedXMap: Map<OriginalNumber, MappedIndex>;
	compressedYMap: Map<OriginalNumber, MappedIndex>;
	compressedGrid: NumberGrid;

	static UNMARKED = 0;
	static EMPTY = 1;
	static TILE = 2;

	constructor(tiles: Point[]) {
		this.tiles = tiles;
		this.compressedXMap = this.compressValues(tiles.map((tile) => tile.x));
		this.compressedYMap = this.compressValues(tiles.map((tile) => tile.y));

		this.compressedGrid = this.generateCompressedGrid();
	}

	compressValues(values: number[]) {
		const uniqueValues = new Set(values);

		/**
		 * Add "padding" and start / end of the unique values, which in turn
		 * will create a thin layer of "padding" around of 2D compressed grid.
		 * This is needed to ensure we can flood fill it later when marking
		 * which coordinates are empty.
		 */
		const min = Math.min(...Array.from(uniqueValues));
		const max = Math.max(...Array.from(uniqueValues));
		uniqueValues.add(min - 1);
		uniqueValues.add(max + 1);

		const sortedValues = Array.from(uniqueValues).sort((a, b) => a - b);

		const compressedMap = new Map<OriginalNumber, MappedIndex>();
		for (let i = 0; i < sortedValues.length; i++) {
			const originalValue = sortedValues[i];
			compressedMap.set(originalValue, i);
		}

		return compressedMap;
	}

	generateCompressedGrid(): NumberGrid {
		// Create 2D Array, all initialized as UNMARKED values
		const compressedGrid = new NumberGrid({
			width: this.compressedXMap.size,
			height: this.compressedYMap.size,
			fillWith: CompressedGrid.UNMARKED,
		});

		// Mark all tiles AND the spaces in between
		for (let i = 0; i < this.tiles.length; i++) {
			/**
			 * > In your list, every red tile is connected to the red tile before and after it
			 * > by a straight line of green tiles. The list wraps, so the first red tile is
			 * > also connected to the last red tile.
			 */
			const currentTile = this.tiles[i];
			const nextTile = this.tiles[(i + 1) % this.tiles.length];

			const rect = new Rectangle(currentTile, nextTile);

			if (currentTile.x === nextTile.x) {
				// Fill a vertical line of tiles between the points on the compressed grid
				const compressedX = this.compressedXMap.get(currentTile.x)!;
				const compressedMinY = this.compressedYMap.get(rect.minY)!;
				const compressedMaxY = this.compressedYMap.get(rect.maxY)!;

				for (let compressedY of range(compressedMinY, compressedMaxY)) {
					// compressedGrid.set(compressedX, compressedY,
					compressedGrid[compressedY][compressedX] = CompressedGrid.TILE;
				}
			}

			if (currentTile.y === nextTile.y) {
				// Fill a horizontal line of tiles between the points on the compressed grid
				const compressedY = this.compressedYMap.get(currentTile.y)!;
				const compressedMinX = this.compressedXMap.get(rect.minX)!;
				const compressedMaxX = this.compressedXMap.get(rect.maxX)!;

				for (let compressedX of range(compressedMinX, compressedMaxX)) {
					compressedGrid[compressedY][compressedX] = CompressedGrid.TILE;
				}
			}
		}

		// Next, mark all cells on the outside of our polygon as empty

		// Start filling from top left corner (this is the corner of our "padding" we added)
		const pointStack: Point[] = [{ x: 0, y: 0 }];
		compressedGrid[0][0] = CompressedGrid.EMPTY;

		while (pointStack.length > 0) {
			const currentPoint = pointStack.pop()!;

			for (let neighbor of neighbors(currentPoint)) {
				if (compressedGrid[neighbor.y]?.[neighbor.x] === CompressedGrid.UNMARKED) {
					compressedGrid[neighbor.y][neighbor.x] = CompressedGrid.EMPTY;
					pointStack.push(neighbor);
				}
			}
		}

		/**
		 * Finally, any UNMARKED cells left must a TILE since they are inside our TILE perimeter.
		 * We technically don't need to do this and can leave them UNMARKED, but for completeness
		 * we fill those in too.
		 */
		for (let y = 0; y < compressedGrid.length; y++) {
			for (let x = 0; x < compressedGrid[y].length; x++) {
				if (compressedGrid[y][x] === CompressedGrid.UNMARKED) {
					compressedGrid[y][x] = CompressedGrid.TILE;
				}
			}
		}

		return compressedGrid;
	}
}

class NumberGrid {
	grid: number[][];
	constructor(options: { width: number; height: number; fillWith: number }) {
		const { width, height, fillWith } = options;
		this.grid = Array(height)
			.fill(fillWith)
			.map(() => Array(width).fill(fillWith));
	}

	get(pt: Point, y: never): number | undefined;
	get(x: number, y: number): number | undefined;
	get(x: number | Point, y: number | never): number | undefined {
		if (typeof x === 'number') {
			return this.grid[y]?.[x];
		}

		// `x` is a Point
		const pt: Point = x;
		return this.grid[pt.y]?.[pt.x];
	}

	set(pt: Point, value: number, _: never): void;
	set(x: number, y: number, value: number): void;
	set(x: number | Point, y: number, value: number | never): void {
		// Assumes point is in bounds

		if (typeof x === 'number') {
			this.grid[y][x] = value;
		} else {
			// `x` is a Point, and `y` is the value
			const pt: Point = x;
			const val: number = y;
			this.grid[pt.y][pt.x] = val;
		}
	}
}

class Rectangle {
	minX: number;
	maxX: number;
	minY: number;
	maxY: number;

	constructor(pt1: Point, pt2: Point) {
		this.minX = Math.min(pt1.x, pt2.x);
		this.maxX = Math.max(pt1.x, pt2.x);
		this.minY = Math.min(pt1.y, pt2.y);
		this.maxY = Math.max(pt1.y, pt2.y);
	}
}

/**
 * Generates numbers from `start` to `end` inclusively, counting by 1.
 *
 * @example
 *   Array.from(range(1, 4)) // [1, 2, 3, 4]
 *   Array.from(range(5, 3)) // [5, 4, 3]
 */
function* range(start: number, end: number) {
	const step = start < end ? 1 : -1;
	for (let i = start; i !== end + step; i += step) {
		yield i;
	}
}

const neighborsDeltas = [
	{ x: 0, y: -1 },
	{ x: 1, y: 0 },
	{ x: 0, y: 1 },
	{ x: -1, y: 0 },
];

function* neighbors(pt: Point) {
	for (let delta of neighborsDeltas) {
		const x = pt.x + delta.x;
		const y = pt.y + delta.y;

		yield { x, y };
	}
}

const cc = new CompressedGrid(input);
cc.markTilesOnCompressedGrid();
