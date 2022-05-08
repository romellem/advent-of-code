const { input } = require('./input.js');
const { RegexMap } = require('./regex-map.js');

let map = new RegexMap();
map.build(input);
const paths = map.buildFrontierFrom(0, 0);
const longPaths = [...paths.entries()].filter((path) => path[1].cost >= 1000);
console.log(longPaths.length);
