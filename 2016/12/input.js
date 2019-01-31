const INSTRUCTIONS = [
    { op: 'cpy', args: [1, 'a'] },
    { op: 'cpy', args: [1, 'b'] },
    { op: 'cpy', args: [26, 'd'] },
    { op: 'jnz', args: ['c', 2] },
    { op: 'jnz', args: [1, 5] },
    { op: 'cpy', args: [7, 'c'] },
    { op: 'inc', args: ['d'] },
    { op: 'dec', args: ['c'] },
    { op: 'jnz', args: ['c', -2] },
    { op: 'cpy', args: ['a', 'c'] },
    { op: 'inc', args: ['a'] },
    { op: 'dec', args: ['b'] },
    { op: 'jnz', args: ['b', -2] },
    { op: 'cpy', args: ['c', 'b'] },
    { op: 'dec', args: ['d'] },
    { op: 'jnz', args: ['d', -6] },
    { op: 'cpy', args: [16, 'c'] },
    { op: 'cpy', args: [12, 'd'] },
    { op: 'inc', args: ['a'] },
    { op: 'dec', args: ['d'] },
    { op: 'jnz', args: ['d', -2] },
    { op: 'dec', args: ['c'] },
    { op: 'jnz', args: ['c', -5] },
];

module.exports = {
    // Sample Program:
    /**
     * cpy 41 a
     * inc a
     * inc a
     * dec a
     * jnz a 2
     * dec a
     */
    sampleInput: {
        instructions: [
            { op: 'cpy', args: [41, 'a'] },
            { op: 'inc', args: ['a'] },
            { op: 'inc', args: ['a'] },
            { op: 'dec', args: ['a'] },
            { op: 'jnz', args: ['a', 2] },
            { op: 'dec', args: ['a'] },
        ],
        registerAResult: 42,
    },
    input: INSTRUCTIONS,
};
