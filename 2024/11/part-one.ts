import { input } from './input';

/**
 * If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
 * If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
 * If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
 */
interface Stone {
	value: number;
	valueStr: string;
	multiplier: number;
}

function makeStone(value: number | string) {
	if (typeof value === 'string') {
		value = parseInt(value, 10);
	}

	return {
		value,
		valueStr: value.toString(),
		multiplier: 1,
	};
}

function updateStone(stone: Stone, newValue: number) {
	stone.value = newValue;
	stone.valueStr = newValue.toString();
}

const stones: Array<Stone> = input.map((value) => {
	return makeStone(value);
});

type StoneMap = Map<number, Stone>;

function addStone(stone: Stone, stoneMap: StoneMap) {
	if (!stoneMap.has(stone.value)) {
		stoneMap.set(stone.value, stone);
	} else {
		const storedStone = stoneMap.get(stone.value)!;
		storedStone.multiplier += stone.multiplier;
	}
}
function removeStone(stone: Stone, stoneMap: StoneMap) {
	stoneMap.delete(stone.value);
}

let stonesMap: StoneMap = new Map();
for (let stone of stones) {
	addStone(stone, stonesMap);
}

const TIMES = 25;

for (let i = 0; i < TIMES; i++) {
	let newStonesMap: StoneMap = new Map();
	for (let stone of stonesMap.values()) {
		if (stone.value === 0) {
			updateStone(stone, 1);
			addStone(stone, newStonesMap);
		} else if (stone.valueStr.length % 2 === 0) {
			const halfDigits = stone.valueStr.length / 2;
			let leftStoneValue = stone.valueStr.slice(0, halfDigits);
			let rightStoneValue = stone.valueStr.slice(halfDigits);
			let leftStone = makeStone(leftStoneValue);
			let rightStone = makeStone(rightStoneValue);

			addStone(leftStone, newStonesMap);
			addStone(rightStone, newStonesMap);
		} else {
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

console.log(sum);
