const { input: memory } = require('./input');
const { ASCII, Computer } = require('./intcode-computer');

let inputs = Computer.parseAsciiInputToArray(
`east
south
south
take hologram

`);
let ascii = new ASCII(memory, { inputs });
ascii.run();
