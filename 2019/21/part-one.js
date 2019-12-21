const { input: memory } = require('./input');
const { ASCII, Computer } = require('./intcode-computer');

// NOT N == Hole at N

let inputs = Computer.parseAsciiInputToArray(`WALK
`);

let ascii = new ASCII(memory, { inputs, pause_on_output: false });
ascii.partOne();
console.log(ascii.computer.flushOutputs());