const INSTRUCTIONS = [
	{ op: 'cpy', args: ['a', 'd'] },
	{ op: 'cpy', args: [9, 'c'] },
	{ op: 'cpy', args: [282, 'b'] },
	{ op: 'inc', args: ['d'] },
	{ op: 'dec', args: ['b'] },
	{ op: 'jnz', args: ['b', -2] },
	{ op: 'dec', args: ['c'] },
	{ op: 'jnz', args: ['c', -5] },
	{ op: 'cpy', args: ['d', 'a'] },
	{ op: 'jnz', args: [0, 0] },
	{ op: 'cpy', args: ['a', 'b'] },
	{ op: 'cpy', args: [0, 'a'] },
	{ op: 'cpy', args: [2, 'c'] },
	{ op: 'jnz', args: ['b', 2] },
	{ op: 'jnz', args: [1, 6] },
	{ op: 'dec', args: ['b'] },
	{ op: 'dec', args: ['c'] },
	{ op: 'jnz', args: ['c', -4] },
	{ op: 'inc', args: ['a'] },
	{ op: 'jnz', args: [1, -7] },
	{ op: 'cpy', args: [2, 'b'] },
	{ op: 'jnz', args: ['c', 2] },
	{ op: 'jnz', args: [1, 4] },
	{ op: 'dec', args: ['b'] },
	{ op: 'dec', args: ['c'] },
	{ op: 'jnz', args: [1, -4] },
	{ op: 'jnz', args: [0, 0] },
	{ op: 'out', args: ['b'] },
	{ op: 'jnz', args: ['a', -19] },
	{ op: 'jnz', args: [1, -21] },
];

module.exports = {
	input: INSTRUCTIONS,
};