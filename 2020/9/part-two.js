const { input } = require('./input');
const { partOne, partTwo } = require('./encoding');

const part_one_answer = partOne(input);
console.log(partTwo(input, part_one_answer));
