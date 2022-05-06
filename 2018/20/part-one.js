const { input } = require('./input.js');
const { RegexMap, RegexNode } = require('./regex-map.js');

let map = new RegexMap();
map.build(input);
map.print();
