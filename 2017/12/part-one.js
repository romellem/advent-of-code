const { input, sampleInput } = require('./input');
const PipedStream = require('./piped-streams');

let test_streams = new PipedStream(sampleInput);
console.log(test_streams.countConnectedPrograms());
