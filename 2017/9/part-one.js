const { input, sampleInputs } = require('./input');
const Stream = require('./stream');
const colors = require('colors');

// Object.entries(sampleInputs).forEach(([line, score]) => {
//     let stream = new Stream(line);
//     console.log(`  Parsed score: ${stream.score}`)
//     console.log(`Supposed to be: ${score}`)
//     console.log(stream.score === score ? 'true'.green : 'false'.red)
// });

let stream = new Stream(input);

console.log(stream.score)