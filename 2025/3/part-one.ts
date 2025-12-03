import { input } from './input';

function findMaxInRow(
	row: number[],
	isFirstDigit: boolean,
	fromIndex: number = 0
): { index: number; value: number } {
	let maxValue = -1;
	let maxIndex = -1;

	const end = isFirstDigit ? row.length - 1 : row.length;
	for (let i = fromIndex; i < end; i++) {
		const value = row[i];
		if (value > maxValue) {
			maxValue = value;
			maxIndex = i;
		}
	}

	return { index: maxIndex, value: maxValue };
}

function findMaxBatteryPair(row: number[]) {
	let firstBattery = findMaxInRow(row, true);
	let secondBattery = findMaxInRow(row, false, firstBattery.index + 1);

	return 10 * firstBattery.value + secondBattery.value;
}

const batteries = input.map((row) => findMaxBatteryPair(row));
const sum = batteries.reduce((a, b) => a + b);

console.log('Part 1:', sum);
