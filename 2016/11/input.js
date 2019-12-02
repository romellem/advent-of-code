const { GENERATOR, MICROCHIP, Floor } = require('./rtg-path');

/*
The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.
*/
const sampleInput = {
	elevator: 0,
	floors: [
		new Floor([
			{ type: MICROCHIP, element: 'H' },
			{ type: MICROCHIP, element: 'L' },
		]),
		new Floor([{ type: GENERATOR, element: 'H' }]),
		new Floor([{ type: GENERATOR, element: 'L' }]),
		new Floor(),
	],
};

// I use 'silver' instead of 'promethium' and
// 'hydrogen' instead of 'cobalt', just to make things easy with the initials
/*
The first floor contains a silver generator and a silver-compatible microchip.
The second floor contains a hydrogen generator, a curium generator, a ruthenium generator, and a plutonium generator.
The third floor contains a hydrogen-compatible microchip, a curium-compatible microchip, a ruthenium-compatible microchip, and a plutonium-compatible microchip.
The fourth floor contains nothing relevant.
*/
const input = {
	elevator: 0,
	floors: [
		new Floor([
			{ type: GENERATOR, element: 'S' },
			{ type: MICROCHIP, element: 'S' },
		]),
		new Floor([
			{ type: GENERATOR, element: 'H' },
			{ type: GENERATOR, element: 'C' },
			{ type: GENERATOR, element: 'R' },
			{ type: GENERATOR, element: 'P' },
		]),
		new Floor([
			{ type: MICROCHIP, element: 'H' },
			{ type: MICROCHIP, element: 'C' },
			{ type: MICROCHIP, element: 'R' },
			{ type: MICROCHIP, element: 'P' },
		]),
		new Floor(),
	],
};

module.exports = {
	sampleInput,
	input,
};
