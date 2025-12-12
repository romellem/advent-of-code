import { input } from './input';
import { combinations } from 'combinatorial-generators';

type Point = { x: number; y: number };

function getArea(pt1: Point, pt2: Point): number {
	const width = Math.abs(pt1.x - pt2.x + 1);
	const height = Math.abs(pt1.y - pt2.y + 1);

	return width * height;
}

let maxArea = -1;
for (let pair of combinations(input, 2)) {
	let [pt1, pt2] = pair;
	const area = getArea(pt1, pt2);
	if (area > maxArea) {
		maxArea = area;
	}
}

console.log('Part 1:', maxArea);
