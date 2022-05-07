const { input } = require('./input.js');
const { RegexMap } = require('./regex-map.js');

let map = new RegexMap();
map.build(input);
const paths = map.buildFrontierFrom(0, 0);
const sortedPaths = [...paths.entries()].sort((pathA, pathB) => pathB[1].cost - pathA[1].cost);
const endNodeLongestPathCost = sortedPaths[0][1].cost;
console.log(endNodeLongestPathCost);

// const endNodeLongestPath = map.nodes.get(sortedPaths[0][0]);
//
// const DIR_ARROWS = {
// 	N: 'v',
// 	S: '^',
// 	E: '<',
// 	W: '>',
// };
//
// const shortPath = new Map([[endNodeLongestPath.id, { node: endNodeLongestPath, char: 'O' }]]);
// let node = sortedPaths[0][1].cameFrom;
// let char = DIR_ARROWS[endNodeLongestPath.dirTo(node)];
// while (node) {
// 	shortPath.set(node.id, { node, char });
// 	let nextNode = paths.get(node.id).cameFrom;
// 	char = DIR_ARROWS[node.dirTo(nextNode)];
// 	node = nextNode;
// }
//
// map.print(shortPath);
