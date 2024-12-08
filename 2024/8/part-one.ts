import G from 'generatorics';
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

const antennas = points.filter((point) => point.char !== '.');
const groups = new Map<string, Array<[number, number]>>();
for (let antenna of antennas) {
	if (!groups.has(antenna.char)) {
		groups.set(antenna.char, []);
	}
	groups.get(antenna.char)!.push([antenna.x, antenna.y]);
}

const uniqueAntennas = Array.from(groups.keys());

let antinodes: Array<Point> = [];

for (let antennaType of uniqueAntennas) {
	const coords = groups.get(antennaType)!;
	if (coords.length < 2) {
		continue;
	}

	for (let antennaPair of G.combination(coords, 2)) {
		const [coordA, coordB] = antennaPair;
		const aToB = [coordB[0] - coordA[0], coordB[1] - coordA[1]] as const;
		const bToA = [coordA[0] - coordB[0], coordA[1] - coordB[1]] as const;

		if (inBounds(aToB[0], aToB[1])) {
			const antinodeB = shift(coordB, aToB);
			antinodes.push({ x: antinodeB[0], y: antinodeB[1], char: antennaType });
		}

		if (inBounds(bToA[0], bToA[1])) {
			const antinodeA = shift(coordA, bToA);
			antinodes.push({ x: antinodeA[0], y: antinodeA[1], char: antennaType });
		}
	}
}

// Check to make sure I don't have a dupe problem
const antinodesSet = new Set(antinodes.map((p) => `${p.char},${p.x},${p.y}`));
console.log(antinodesSet.size);
console.log(antinodes.length);

// 154 too low
