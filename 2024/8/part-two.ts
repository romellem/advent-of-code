import G from 'generatorics';
import _ from 'lodash';

import { input } from './input';

type Point = {
	x: number;
	y: number;
	char: string;
};

const points: Array<Point> = input
	.map((line, y) => {
		return line.map((char, x) => {
			return {
				char,
				x,
				y,
			};
		});
	})
	.flat();

const maxX = input[0].length;
const maxY = input.length;

function inBounds(x: number, y: number): boolean {
	return x >= 0 && x < maxX && y >= 0 && y < maxY;
}

function shift(vecA: readonly [number, number], vecB: readonly [number, number]): [number, number] {
	return [vecA[0] + vecB[0], vecA[1] + vecB[1]];
}

// Use singleton pattern for antinodes so they can dedupe within our Set
const antinodeCache = new Map<string, Point>();
function getAntinode(x: number, y: number, char: string): Point {
	const key = `${x},${y},${char}`;
	if (!antinodeCache.has(key)) {
		antinodeCache.set(key, { x, y, char });
	}
	return antinodeCache.get(key)!;
}

// Group antennas by its frequency type
const antennas = points.filter((point) => point.char !== '.');
const groups = new Map<string, Array<[number, number]>>();
for (let antenna of antennas) {
	if (!groups.has(antenna.char)) {
		groups.set(antenna.char, []);
	}
	groups.get(antenna.char)!.push([antenna.x, antenna.y]);
}

const uniqueAntennas = Array.from(groups.keys());

const antinodes = new Set<Point>();

for (let antennaType of uniqueAntennas) {
	const coords = groups.get(antennaType)!;

	// If there's only 1 antenna of this frequency, not antinodes can be formed (no pairs can be created)
	if (coords.length < 2) {
		continue;
	}

	for (let antennaPair of G.combination(coords, 2)) {
		const [coordA, coordB] = antennaPair;

		// In part two, antinodes always live on the antennas themselves
		antinodes.add(getAntinode(...coordA, antennaType));
		antinodes.add(getAntinode(...coordB, antennaType));

		// Calculate vectors between the two antennas
		const aToB = [coordB[0] - coordA[0], coordB[1] - coordA[1]] as const;
		const bToA = [coordA[0] - coordB[0], coordA[1] - coordB[1]] as const;

		// Loop each vector, adding the vector to create new antinodes until we are out of bounds
		let antinodeA = coordA;
		do {
			antinodeA = shift(antinodeA, bToA);
			if (!inBounds(...antinodeA)) {
				break;
			}
			antinodes.add(getAntinode(...antinodeA, antennaType));
		} while (true);

		let antinodeB = coordA;
		do {
			antinodeB = shift(antinodeB, aToB);
			if (!inBounds(...antinodeB)) {
				break;
			}
			antinodes.add(getAntinode(...antinodeB, antennaType));
		} while (true);
	}
}

/**
 * We might have counted antinodes of different frequencies, but the instructions
 * show that we only care if _any_ antinode exists. So afterward, dedupe our list
 * against the coordinates only.
 *
 * We could have skipped this step by only storing the coords to begin with, but
 * I thought the antinode type might be useful for part two in the puzzle. It wasn't,
 * but no biggie in keeping this as is. It doesn't add that much to the compute time.
 */
const uniqueAntinodes = _.uniqBy(Array.from(antinodes), (point) => `${point.x},${point.y}`);

console.log(uniqueAntinodes.length);
