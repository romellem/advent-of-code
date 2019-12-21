const { input: memory } = require('./input');
const { ASCII, Computer } = require('./intcode-computer');

// NOT N == Hole at N

let inputs = Computer.parseAsciiInputToArray(`NOT A J
NOT B T
AND T J
NOT C T
AND T J
AND D J
NOT A T
OR T J
NOT B T
AND A T
AND C T
OR T J
WALK
`);

let ascii = new ASCII(memory, { inputs, pause_on_output: false });
ascii.partOne();
console.log(ascii.computer.flushOutputs());