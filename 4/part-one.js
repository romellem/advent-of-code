const fs = require('fs');
const path = require('path');
const Company = require('./modules/company');

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n);

let c = new Company(input);

console.log(c.log.length);