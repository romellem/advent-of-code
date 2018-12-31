const ON = '#';
const OFF = '.';

const ROWS = [
    '.#.#.#',
    '...##.',
    '#....#',
    '..#...',
    '#.#..#',
    '####..',
];

const GRID = ROWS.map(row => row.split('').map(c => c === ON));

module.exports = GRID;
