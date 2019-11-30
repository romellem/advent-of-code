/**
 * State is an array, each index being a floor.
 * The floor is a Map, with the key being the element, and the value is its type (chip or generator)
 * As items are moved between floors, the floor will have the item `delete`d or `set` upon it.
 *
 * States are calculated by summing the chips and generators on a floor and saving
 * that as a "known state". This could be represented as a 2d array, with the
 * inner array containing two elements, one is the chip total, the other is the
 * generator total.
 *
 * So for our sample input, the initial state could be written as:
 *
 *     [
 *         [2, 0], // 2 chips, 0 generators
 *         [0, 1], // 0 chips, 1 generator
 *         [0, 1], // 0 chips, 1 generator
 *         [0, 0], // 0 chips, 0 generators
 *     ]
 *
 * To keep things simple in saving these states as "visited" so I don't connect
 * an edge between them, I will store this as a comma separated string, the first
 * value being the chip count, and the second being the generator count.
 *
 * So then my initial state could be represented as the string
 *
 *     "2,0,0,1,0,1,0,0"
 */
const MICROCHIP = 'M';
const GENERATOR = 'G';

const sampleInput = [
	new Map([
		['H', MICROCHIP],
		['L', MICROCHIP],
	]),
	new Map([
		['H', GENERATOR]
	]),
	new Map([
		['L', GENERATOR]
	]),
	new Map()
];

const input = [
	new Map([
		['Promethium', GENERATOR],
		['Promethium', MICROCHIP]
	]),
	new Map([
		['Cobalt', GENERATOR],
		['Curium', GENERATOR],
		['Ruthenium', GENERATOR],
		['Plutonium', GENERATOR]
	]),
	new Map([
		['Cobalt', MICROCHIP],
		['Curium', MICROCHIP],
		['Ruthenium', MICROCHIP],
		['Plutonium', MICROCHIP]
	]),
	new Map()
];

module.exports = {
	input,
	sampleInput,
};
