import { input } from './input';
import { InfiniteGrid, type GridId } from './infinite-grid';

const grid = new InfiniteGrid({ load: input, parseAs: Number });
const hikingTrails = grid.findAll(0);

function findTrailheads(id: GridId, grid: InfiniteGrid<number>) {
	const findTrailheadsDFS = (
		id: GridId,
		currentPath: Array<GridId>,
		allPaths: Array<Array<GridId>>
	): Array<Array<GridId>> => {
		const x = InfiniteGrid.toXCoord(id);
		const y = InfiniteGrid.toYCoord(id);
		const value = grid.get(x, y);

		if (value === 9) {
			// At the end of the trail, save it
			allPaths.push([...currentPath, id]);
		} else {
			for (let neighbor of grid.neighbors(x, y).values()) {
				if (neighbor.value === value + 1) {
					// Valid next step, recurse down this new path
					findTrailheadsDFS(neighbor.id, [...currentPath, id], allPaths);
				}
			}
		}

		return allPaths;
	};

	const trailheads = findTrailheadsDFS(id, [], []);
	return trailheads;
}

let trailheadSum = 0;
for (let { id } of hikingTrails) {
	const trailheads = findTrailheads(id, grid);
	const uniquePeaks = new Set(trailheads.map((trail) => trail.at(-1)));
	trailheadSum += uniquePeaks.size;
}

console.log(trailheadSum);
