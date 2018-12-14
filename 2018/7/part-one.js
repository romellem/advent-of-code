const fs = require('fs');
const path = require('path');
const Tree = require('./tree');

let input_text_file = process.argv[2] || './input.txt';

let raw_input = fs.readFileSync(path.resolve(__dirname, input_text_file), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n);

let tree = new Tree(input);

let order = tree.generateOrder();
console.log(`Order of our "flow chart" is: ${order}`);
