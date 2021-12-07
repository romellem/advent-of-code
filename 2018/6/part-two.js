const fs = require('fs');
const path = require('path');
const distance = require('manhattan');

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n);

let coordinates = input.map(p => p.split(',').map(n => +n));

let flattened = coordinates.flat();
let largest = Math.max(...flattened);

let grid = Array(largest + 2)
    .fill()
    .map(n => {
        return Array(largest + 2).fill(-1);
    });

// Loop through grid and mark spots that are coordinates
coordinates.forEach((coord, index) => {
    let [i, j] = coord;
    grid[i][j] = 'C' + index;
});

const MIN_DIST = 10000;

let min_dist_count = 0;
for (let i = 0; i < grid.length; i++) {
    let row = grid[i];
    for (let j = 0; j < grid.length; j++) {
        let cell = row[j];
        if (typeof cell !== 'string') {
            // Not a coord, measure it
            let lengths = coordinates.map((coord, index) => {
                return distance(coord, [i, j]);
            });

            let sum = lengths.reduce((a, b) => a + b);
            if (sum < MIN_DIST) {
                grid[i][j] = 'close';
                min_dist_count++;
            }
        }
    }
}

// Loop through coords, and find ones that are surrounded by "found" areas
coordinates.forEach(coord => {
    let [i, j] = coord;
    let t = grid[i - 1][j];
    let r = grid[i][j + 1];
    let b = grid[i + 1][j];
    let l = grid[i][j - 1];

    const C = 'close';

    if (t === C && r === C && b === C && l === C) {
        min_dist_count++;
    }
});

console.log(min_dist_count);
