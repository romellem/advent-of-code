const { input } = require('./input');
const { ASCII } = require('./intcode-computer');

let ascii = new ASCII(input, { pause_on_output: false });
console.log(ascii.partOne());