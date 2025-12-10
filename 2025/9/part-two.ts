import { input } from './input';
import { combinations } from 'combinatorial-generators';

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

			// Use modulo trick to loop back to beginning when `currentTile` is the last one
			const nextTile = this.tiles[(i + 1) % this.tiles.length];

			const rect = new Rectangle(currentTile, nextTile);

			if (currentTile.x === nextTile.x) {
				// Fill a vertical line of tiles between the points on the compressed grid
				const compressedX = this.compressedXMap.get(currentTile.x)!;
				const compressedMinY = this.compressedYMap.get(rect.minY)!;
				const compressedMaxY = this.compressedYMap.get(rect.maxY)!;

				for (let compressedY of range(compressedMinY, compressedMaxY)) {
					compressedGrid.set(compressedX, compressedY, CompressedGrid.TILE);
				}
			}

			if (currentTile.y === nextTile.y) {
				// Fill a horizontal line of tiles between the points on the compressed grid
				const compressedY = this.compressedYMap.get(currentTile.y)!;
				const compressedMinX = this.compressedXMap.get(rect.minX)!;
				const compressedMaxX = this.compressedXMap.get(rect.maxX)!;

				for (let compressedX of range(compressedMinX, compressedMaxX)) {
					compressedGrid.set(compressedX, compressedY, CompressedGrid.TILE);
				}
			}
		}

		// Next, mark all cells on the outside of our polygon as empty

		// Start filling from top left corner (this is the corner of our "padding" we added)
		const pointStack: Point[] = [{ x: 0, y: 0 }];
		compressedGrid.set(0, 0, CompressedGrid.EMPTY);

		while (pointStack.length > 0) {
			const currentPoint = pointStack.pop()!;

			for (let neighbor of neighbors(currentPoint)) {
				if (compressedGrid.get(neighbor) === CompressedGrid.UNMARKED) {
					compressedGrid.set(neighbor, CompressedGrid.EMPTY);
					pointStack.push(neighbor);
				}
			}
		}

		/**
		 * Finally, any UNMARKED cells left must a TILE since they are inside our TILE perimeter.
		 * We technically don't need to do this and can leave them UNMARKED, but for completeness
		 * we fill those in too.
		 */
		for (let y = 0; y < compressedGrid.height; y++) {
			for (let x = 0; x < compressedGrid.width; x++) {
				if (compressedGrid.get(x, y) === CompressedGrid.UNMARKED) {
					compressedGrid.set(x, y, CompressedGrid.TILE);
				}
			}
		}

		return compressedGrid;
	}

	doesRectangleContainAllTiles(rect: Rectangle): boolean {
		const bottomLeftX = this.compressedXMap.get(rect.minX)!;
		const bottomleftY = this.compressedYMap.get(rect.minY)!;
		const compressedMaxX = this.compressedXMap.get(rect.maxX)!;
		const compressedMaxY = this.compressedYMap.get(rect.maxY)!;

		for (let y of range(bottomleftY, compressedMaxY)) {
			for (let x of range(bottomLeftX, compressedMaxX)) {
				if (this.compressedGrid.get(x, y) === CompressedGrid.EMPTY) {
					return false;
				}
			}
		}

		/**
		 * We looped all coords within the compressed rectangle and never
		 * came across an EMPTY cell, it means the rect is full of TILES!
		 */
		return true;
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

	get width() {
		return this.grid[0].length;
	}

	get height() {
		return this.grid.length;
	}

	get(pt: Point): number | undefined;
	get(x: number, y: number): number | undefined;
	get(xOrPoint: number | Point, y?: number): number | undefined {
		if (typeof xOrPoint === 'number') {
			// Called as get(x, y)
			if (typeof y !== 'number') {
				return undefined;
			}
			return this.grid[y]?.[xOrPoint];
		}

		// Called as get({ x, y })
		return this.grid[xOrPoint.y]?.[xOrPoint.x];
	}

	set(pt: Point, value: number): void;
	set(x: number, y: number, value: number): void;
	set(xOrPoint: number | Point, yOrValue: number, value?: number): void {
		if (typeof xOrPoint === 'number') {
			// set(x, y, value)
			const y = yOrValue;
			const val = value;
			if (typeof val !== 'number') {
				throw new Error('Missing value when calling set(x, y, value)');
			}
			this.grid[y][xOrPoint] = val;
		} else {
			// set({ x, y }, value)
			const pt: Point = xOrPoint;
			const val: number = yOrValue;
			this.grid[pt.y][pt.x] = val;
		}
	}
}

class Rectangle {
	minX: number;
	maxX: number;
	minY: number;
	maxY: number;

	width: number;
	height: number;
	area: number;

	constructor(pt1: Point, pt2: Point) {
		this.minX = Math.min(pt1.x, pt2.x);
		this.maxX = Math.max(pt1.x, pt2.x);
		this.minY = Math.min(pt1.y, pt2.y);
		this.maxY = Math.max(pt1.y, pt2.y);

		this.width = Math.abs(this.maxX - this.minX + 1);
		this.height = Math.abs(this.maxY - this.minY + 1);
		this.area = this.width * this.height;
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

const grid = new CompressedGrid(input);

let maxArea = -1;
for (let pair of combinations(input, 2)) {
	let [pt1, pt2] = pair;
	const rect = new Rectangle(pt1, pt2);
	if (grid.doesRectangleContainAllTiles(rect)) {
		maxArea = Math.max(maxArea, rect.area);
	}
}

console.log('Part 2:', maxArea);
