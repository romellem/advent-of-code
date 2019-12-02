const { RTGPath } = require('./rtg-path');
const parse = RTGPath.parseInputStringToStartingArrangementObject;

const TEST_INPUT = `The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`;

const INPUT = `The first floor contains a promethium generator and a promethium-compatible microchip.
The second floor contains a cobalt generator, a curium generator, a ruthenium generator, and a plutonium generator.
The third floor contains a cobalt-compatible microchip, a curium-compatible microchip, a ruthenium-compatible microchip, and a plutonium-compatible microchip.
The fourth floor contains nothing relevant.`;

// Plus: elerium and dilithium chip/gen pair on first floor
const PART_TWO_INPUT = `The first floor contains a promethium generator, an elerium generator, an elerium-compatible microchip, a dilithium generator, a dilithium-compatible microchip, and a promethium-compatible microchip.
The second floor contains a cobalt generator, a curium generator, a ruthenium generator, and a plutonium generator.
The third floor contains a cobalt-compatible microchip, a curium-compatible microchip, a ruthenium-compatible microchip, and a plutonium-compatible microchip.
The fourth floor contains nothing relevant.`;

const sampleInput = parse(TEST_INPUT);
const input = parse(INPUT);
const partTwoInput = parse(PART_TWO_INPUT);

module.exports = {
	sampleInput,
	input,
	partTwoInput,
};
