import G from 'generatorics';

import { input } from './input';

type Point = {
	x: number;
	y: number;
	char: string;
};

type Antinode = {
	x: number;
	y: number;
};

type Vect = {
	dx: number;
	dy: number;
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

function shift(antinode: Readonly<Antinode>, vec: Readonly<Vect>): Antinode {
	return { x: antinode.x + vec.dx, y: antinode.y + vec.dy };
}

/**
 * Use singleton pattern for antinodes so they can dedupe within our Set.
 * Antinodes aren't unique by frequency types, just coordinates. That is,
 * two antennas might create an antinode at the same location, but only
 * a single antinode should be present.
 */
const antinodeCache = new Map<string, Antinode>();
function getAntinode(x: number, y: number): Antinode {
	const key = `${x},${y}`;
	if (!antinodeCache.has(key)) {
		antinodeCache.set(key, { x, y });
	}
	return antinodeCache.get(key)!;
}

// Group antennas by its frequency type
const antennas = points.filter((point) => point.char !== '.');
const groups = new Map<string, Array<Point>>();
for (let antenna of antennas) {
	if (!groups.has(antenna.char)) {
		groups.set(antenna.char, []);
	}
	groups.get(antenna.char)!.push(antenna);
}

const uniqueAntennaFrequencies = Array.from(groups.keys());

const antinodes = new Set<Antinode>();

for (let antennaFrequency of uniqueAntennaFrequencies) {
	const listOfAntennas = groups.get(antennaFrequency)!;

	// If there's only 1 antenna of this frequency, not antinodes can be formed (no pairs can be created)
	if (listOfAntennas.length < 2) {
		continue;
	}

	for (let antennaPair of G.combination(listOfAntennas, 2)) {
		const [antennaA, antennaB] = antennaPair;

		// Calculate vectors between the two antennas. aToB == -1 * bToA
		const aToB: Vect = { dx: antennaB.x - antennaA.x, dy: antennaB.y - antennaA.y };
		const bToA: Vect = { dx: antennaA.x - antennaB.x, dy: antennaA.y - antennaB.y };

		// Continue adding the vector to create new antinodes until we are out of bounds
		const antinodeA: Antinode = shift(antennaA, bToA);
		if (inBounds(antinodeA.x, antinodeA.y)) {
			antinodes.add(getAntinode(antinodeA.x, antinodeA.y));
		}

		// Do the same but in the other direction
		const antinodeB: Antinode = shift(antennaB, aToB);
		if (inBounds(antinodeB.x, antinodeB.y)) {
			antinodes.add(getAntinode(antinodeB.x, antinodeB.y));
		}
	}
}

console.log(antinodes.size);
