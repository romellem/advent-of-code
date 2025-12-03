import { sampleInput as input } from './input';

console.log(input);

function findMaxInRow(row: number[], fromIndex: number = 0): { index: number; value: number } {
	let maxValue = -1;
	let maxIndex = -1;
	for (let i = fromIndex; i < row.length; i++) {
		const value = row[i];
		if (value > maxValue) {
			maxValue = value;
			maxIndex = i;
		}
	}

	return { index: maxIndex, value: maxValue };
}

function findMaxBatteryPair(row: number[]) {
	let firstBattery = findMaxInRow(row);
	let secondBattery = findMaxInRow(row, firstBattery.index + 1);

	return 10 * firstBattery.value + secondBattery.value;
}

const batteries = input.map((row) => findMaxBatteryPair(row));
console.log(batteries);
const sum = batteries.reduce((a, b) => a + b);

console.log('Part 1:', sum);
