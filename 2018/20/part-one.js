const { input } = require('./input.js');
const { RegexMap } = require('./regex-map.js');

let map = new RegexMap();
map.build(input);
const paths = map.buildFrontierFrom(0, 0);
const sortedPaths = [...paths.entries()].sort((pathA, pathB) => pathB[1].cost - pathA[1].cost);
console.log(sortedPaths[0]);
