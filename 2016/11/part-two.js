const { partTwoInput } = require('./input');
const { RTGPath } = require('./rtg-path');

const path = new RTGPath(partTwoInput);

console.log(path.getPathFromVistedNode(path.goal), '\n============\n');
console.log(path.getShortestLengthToFourthFloor());
