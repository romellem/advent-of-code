const { input, sampleInput } = require('./input');
const Program = require('./program');

let program = new Program(input);

console.log(program.executeAndGetLargestRegisterAtAnyTime());
