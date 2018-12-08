const fs = require('fs');
const path = require('path');
const Tree = require('./tree');

let input_file = process.argv[2] || './input.txt';

let raw_input = fs.readFileSync(path.resolve(__dirname, input_file), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n)[0];
let list = input.split(' ').map(n => parseInt(n)).filter(n => !Number.isNaN(n));

let tree = new Tree(list);
console.log(tree.head.getValue());
