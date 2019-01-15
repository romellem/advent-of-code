const { flatten } = require('lodash');
const { getKnotHashOfString } = require('./knot');

const HEX_TO_BIN_LOOKUP = {};
'0123456789abcdef'.split('').forEach(char => {
    HEX_TO_BIN_LOOKUP[char] = parseInt(char, 16)
        .toString(2)
        .padStart(4, '0');
});

const getBitGridOfKeyString = (str, size = 128) => {
    let grid = Array(size).fill();

    for (let r = 0; r < size; r++) {
        let dense_hash = getKnotHashOfString(`${str}-${r}`);
        let bits = dense_hash
            .split('')
            .map(c => HEX_TO_BIN_LOOKUP[c])
            .join('')
            .split('')
            .map(n => +n);
        grid[r] = bits;
    }

    return grid;
};

const countUsedBits = grid => {
    return flatten(grid).reduce((a, b) => a + b, 0);
};

module.exports = {
    getBitGridOfKeyString,
    countUsedBits,
};
