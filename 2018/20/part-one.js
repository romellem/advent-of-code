const { input } = require('./input.js');
const { RegexMap } = require('./regex-map.js');

let map = new RegexMap();
map.build(input);
map.print();
