import { input } from './input';

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

	for (let count = 1; count <= size; count++) {
		/**
		 * If we have no batteries, start searching from beginning.
		 * Otherwise search from 1 index after the last battery found.
		 */
		const searchFromIndex = batteryCells.length === 0 ? 0 : batteryCells.at(-1)!.index + 1;

		/**
		 * Don't search past the number of batteries left to find.
		 * E.g. if there is 1 battery left in our count, only search until the second to last index
		 */
		const batteriesLeft = size - count;
		const searchToIndex = row.length - batteriesLeft;

		const batteryCell = findMaxInRow(row, searchFromIndex, searchToIndex);

		batteryCells.push(batteryCell);
	}

	// Concat all digits together and return a single number
	const batteryStr = batteryCells.map(({ value }) => value).join('');
	return parseInt(batteryStr, 10);
}

const batteries = input.map((row) => findMaxBatteryTuple(row, 12));
const sum = batteries.reduce((a, b) => a + b);

console.log('Part 2:', sum);
