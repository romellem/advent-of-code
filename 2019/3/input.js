const path = require('path');
const fs = require('fs');

const raw_input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim();
const [wire_a_raw, wire_b_raw] = raw_input.split('\n');

/**
 * @returns {Array<Array<String, Number>>} Returns an array of arrays which contain the direction 'L', 'R', 'U', or 'D', followed by the distance to move.
 * @example parseWire('R8,U5,L5,D3') // -> returns
 *          [
 *              ['R', 8],
 *              ['U', 5],
 *              ['L', 5],
 *              ['D', 3],
 *          ]
 */
parseWire = (wire) => {
	return wire.split(',').map((movement) => {
		return [movement.substring(0, 1), parseInt(movement.substring(1), 10)];
	});
};

module.exports = {
	parseWire,
	sampleInputs: [
		{
			wire_a: parseWire('R8,U5,L5,D3'),
			wire_b: parseWire('U7,R6,D4,L4'),
			closest: 6,
			steps: 30,
		},
		{
			wire_a: parseWire('R75,D30,R83,U83,L12,D49,R71,U7,L72'),
			wire_b: parseWire('U62,R66,U55,R34,D71,R55,D58,R83'),
			closest: 159,
			steps: 610,
		},
		{
			wire_a: parseWire('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'),
			wire_b: parseWire('U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'),
			closest: 135,
			steps: 410,
		},
	],
	input: {
		wire_a: parseWire(wire_a_raw),
		wire_b: parseWire(wire_b_raw),
	},
};
