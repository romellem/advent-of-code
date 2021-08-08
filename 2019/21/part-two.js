const { input: memory } = require('./input');
const { Computer } = require('./intcode-computer');
const SpringScript = require('./springscript');

// NOT N == Hole at N

const script = SpringScript.cleanSpringScript(`
NOT C J  # J = !C
AND D J  # J = !C & D
AND H J  # J = !C & D & H

NOT B T
OR  T J  # J = (!C & D & H) | !B

NOT A T
OR  T J  # J = (!C & D & H) | !B | !A
AND D J  # J = ((!C & D & H) | !B | !A) & D
RUN`);
let inputs = Computer.parseAsciiInputToArray(script);

let ascii = new Computer({ memory, inputs, pause_on: {} });
ascii.run();
let last_moments = ascii.flushOutputs();
console.log(SpringScript.annotateLastMoments({ moments: last_moments, sensor_range: 9 }));
