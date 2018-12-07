const fs = require('fs');
const path = require('path');
const Tree = require('./tree');

let input_text_file = process.argv[2] || './input.txt';

let raw_input = fs.readFileSync(path.resolve(__dirname, input_text_file), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n);

const WORKERS = typeof process.argv[3] === 'undefined' ? 5 : parseInt(process.argv[3]);
const MIN_TIME = typeof process.argv[4] === 'undefined' ? 60 : parseInt(process.argv[4]);

let tree = new Tree(input);
let time = tree.calculateTime(WORKERS, MIN_TIME);

console.log(`Total time (when using ${WORKERS} works and a minimum of ${MIN_TIME} seconds for each task) is: ${time}`);
