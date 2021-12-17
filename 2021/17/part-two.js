const { input } = require('./input');
const { getValidTrajectories } = require('./launcher');

const solutions = getValidTrajectories(input);

console.log(solutions.length);
