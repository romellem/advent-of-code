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
	 * > A trailhead's score is the number of 9-height positions reachable
	 * > from that trailhead via a hiking trail.
	 *
	 * `trailheads` are all the full valid paths to the end of the trail.
	 * However, for part one, we only care about how many _endings_ the trail
	 * has, now how many ways there are to get to that end.
	 *
	 * So, pop off the ending coord (the `9` height cell) and count the
	 * number of unique peaks we have to add to our sum.
	 */
	const uniquePeaks = new Set(trailheads.map((trail) => trail.at(-1)));
	trailheadSum += uniquePeaks.size;
}

console.log(trailheadSum);
