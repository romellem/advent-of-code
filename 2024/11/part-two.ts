import { input } from './input';

interface Stone {
	value: number;
	valueStr: string;
	multiplier: number;
}

function makeStone(value: number | string, multiplier: number = 1) {
	if (typeof value === 'string') {
		value = parseInt(value, 10);
	}

	return {
		value,
		valueStr: value.toString(),
		multiplier,
	};
}

function addStone(stone: Stone, stoneMap: StoneMap) {
	if (!stoneMap.has(stone.value)) {
		stoneMap.set(stone.value, stone);
	} else {
		const storedStone = stoneMap.get(stone.value)!;
		storedStone.multiplier += stone.multiplier;
	}
}

function updateStone(stone: Stone, newValue: number) {
	stone.value = newValue;
	stone.valueStr = newValue.toString();
}

type StoneMap = Map<number, Stone>;

let stonesMap: StoneMap = new Map();
for (let num of input) {
	addStone(makeStone(num), stonesMap);
}

function runTimes(times: number) {
	for (let i = 0; i < times; i++) {
		// Don't iterate stonesMap and update it in place. We need to update in a clean pass
		let newStonesMap: StoneMap = new Map();
		for (let stone of stonesMap.values()) {
			if (stone.value === 0) {
				// If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
				updateStone(stone, 1);
				addStone(stone, newStonesMap);
			} else if (stone.valueStr.length % 2 === 0) {
				/**
				 * If the stone is engraved with a number that has an even number of digits,
				 * it is replaced by two stones. The left half of the digits are engraved on the
				 * new left stone, and the right half of the digits are engraved on the new right stone.
				 * (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
				 */
				const halfDigits = stone.valueStr.length / 2;
				let leftStoneValue = stone.valueStr.slice(0, halfDigits);
				let rightStoneValue = stone.valueStr.slice(halfDigits);

				/**
				 * Here is the main trick: count the number of stones that have
				 * the same number engraved. When we split, only split the stone once,
				 * and carry over the multiplier. So if we have ten stones with the value `98`,
				 * split into two stones `9` and `8`, each with a multipier of ten.
				 */
				let leftStone = makeStone(leftStoneValue, stone.multiplier);
				let rightStone = makeStone(rightStoneValue, stone.multiplier);

				addStone(leftStone, newStonesMap);
				addStone(rightStone, newStonesMap);
			} else {
				/**
				 * If none of the other rules apply, the stone is replaced by a new stone;
				 * the old stone's number multiplied by 2024 is engraved on the new stone.
				 */
				updateStone(stone, stone.value * 2024);
				addStone(stone, newStonesMap);
			}
		}

		stonesMap = newStonesMap;
	}

	let sum = 0;
	for (let stone of stonesMap.values()) {
		sum += stone.multiplier;
	}
	return sum;
}

console.log(runTimes(75));
