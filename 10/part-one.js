const fs = require('fs');
const path = require('path');
const Grid = require('./grid');

let input_file = process.argv[2] || './input.txt';

let raw_input = fs.readFileSync(path.resolve(__dirname, input_file), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n);

let grid = new Grid(input);

let i = 0;
while (true) {
    grid.tick(i++);
}

