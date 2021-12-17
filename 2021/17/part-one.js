const { input } = require('./input');
const { getValidTrajectories } = require('./launcher');

const solutions = getValidTrajectories(input);
const { max_y } = solutions.sort((a, b) => b.max_y - a.max_y)[0];

console.log(max_y);
