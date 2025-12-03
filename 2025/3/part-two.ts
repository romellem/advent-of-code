import { sampleInput as input } from './input';

type Battery = { index: number; value: number };

function findMaxInRow(row: number[], fromIndex: number, toIndex: number): Battery {
	let maxValue = -1;
	let maxIndex = -1;

	for (let i = fromIndex; i < toIndex; i++) {
		const value = row[i];
		if (value > maxValue) {
			maxValue = value;
			maxIndex = i;
		}
	}

	return { index: maxIndex, value: maxValue };
}

function findMaxBatteryTuple(row: number[], size: number) {
	const batteryCells: Array<Battery> = [];
	for (let i = 0; i < size; i++) {
		const currentBatteryCount = i + 1;
		const previousBatteryIndex = batteryCells.at(-1)?.index ?? -1;
		const batteryCell = findMaxInRow(
			row,
			previousBatteryIndex + 1,
			row.length - size + currentBatteryCount
		);

		batteryCells.push(batteryCell);
	}

	const batteryStr = batteryCells.map(({ value }) => value.toString()).join('');
	return parseInt(batteryStr, 0);
}

const batteries = input.map((row) => findMaxBatteryTuple(row, 12));
console.log(batteries);
const sum = batteries.reduce((a, b) => a + b);

console.log('Part 2:', sum);
