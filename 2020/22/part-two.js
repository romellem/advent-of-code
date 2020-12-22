const { input, sampleInput } = require('./input');
const { recursivePlay } = require('./game');
let a = recursivePlay(input[0], input[1]);
console.log(a);
