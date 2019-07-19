const INSTRUCTIONS = [
	{ op: 'cpy', args: ['a', 'b'] },
	{ op: 'dec', args: ['b'] },
	{ op: 'cpy', args: ['a', 'd'] },
	{ op: 'cpy', args: [0, 'a'] },
	{ op: 'cpy', args: ['b', 'c'] },
	{ op: 'inc', args: ['a'] },
	{ op: 'dec', args: ['c'] },
	{ op: 'jnz', args: ['c', -2] },
	{ op: 'dec', args: ['d'] },
	{ op: 'jnz', args: ['d', -5] },
	{ op: 'dec', args: ['b'] },
	{ op: 'cpy', args: ['b', 'c'] },
	{ op: 'cpy', args: ['c', 'd'] },
	{ op: 'dec', args: ['d'] },
	{ op: 'inc', args: ['c'] },
	{ op: 'jnz', args: ['d', -2] },
	{ op: 'tgl', args: ['c'] },
	{ op: 'cpy', args: [-16, 'c'] },
	{ op: 'jnz', args: ['1', 'c'] },
	{ op: 'cpy', args: [99, 'c'] },
	{ op: 'jnz', args: [77, 'd'] },
	{ op: 'inc', args: ['a'] },
	{ op: 'inc', args: ['d'] },
	{ op: 'jnz', args: ['d', -2] },
	{ op: 'inc', args: ['c'] },
	{ op: 'jnz', args: ['c', -5] },
];

module.exports = {
	// Sample Program:
	/**
	 * cpy 2 a
	 * tgl a
	 * tgl a
	 * tgl a
	 * cpy 1 a
	 * dec a
	 * dec a
	 */
	sampleInput: {
		instructions: [
			{ op: 'cpy', args: [2, 'a'] },
			{ op: 'tgl', args: ['a'] },
			{ op: 'tgl', args: ['a'] },
			{ op: 'tgl', args: ['a'] },
			{ op: 'cpy', args: [1, 'a'] },
			{ op: 'dec', args: ['a'] },
			{ op: 'dec', args: ['a'] },
		],
		registerAResult: 3,
	},
	input: INSTRUCTIONS,
};
