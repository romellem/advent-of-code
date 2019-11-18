const { unscramble } = require('./scramble');
const { input, partTwoPassword } = require('./input');

let result = unscramble(partTwoPassword, input.instructions);
console.log(result);
