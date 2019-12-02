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
		new Floor([{ type: MICROCHIP, element: 'H'}, { type: MICROCHIP, element: 'L'}]),
		new Floor([{ type: GENERATOR, element: 'H'}]),
		new Floor([{ type: GENERATOR, element: 'L'}]),
		new Floor(),
	]
};

const input = {
	elevator: 0,
	floors: [
		[1, 1],
		[0, 4],
		[4, 0],
		[0, 0],
	]
};

module.exports = {
	sampleInput,
	input,
};