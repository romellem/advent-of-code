import { input } from './input';
import { InfiniteGrid, type GridId } from './infinite-grid';

const grid = new InfiniteGrid({ load: input, parseAs: Number });
const hikingTrails = grid.findAll(0);

function findTrailheads(id: GridId, grid: InfiniteGrid<number>) {
	const findTrailheadsDFS = (
		currentPath: Array<GridId>,
		allPaths: Array<Array<GridId>>
	): Array<Array<GridId>> => {
		const lastId = currentPath.at(-1)!;
		const x = InfiniteGrid.toXCoord(lastId);
		const y = InfiniteGrid.toYCoord(lastId);
		const value = grid.get(x, y);

		if (value === 9) {
			// At the end of the trail, save it
			allPaths.push(currentPath);
		} else {
			for (let neighbor of grid.neighbors(x, y).values()) {
				if (neighbor.value === value + 1) {
					// Valid next step, recurse down this new path from that neighbor
					findTrailheadsDFS([...currentPath, neighbor.id], allPaths);
				}
			}
		}

		return allPaths;
	};

	// Start the walk from the `id`
	const trailheads = findTrailheadsDFS([id], []);
	return trailheads;
}

let trailheadSum = 0;
for (let { id } of hikingTrails) {
	const trailheads = findTrailheads(id, grid);
	/**
	 * For part two, a trailhead's rating is
	 * "the number of distinct hiking trails which begin at that trailhead."
	 */
	trailheadSum += trailheads.length;
}

console.log(trailheadSum);
