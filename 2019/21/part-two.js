const { input: memory } = require('./input');
const { ASCII, Computer } = require('./intcode-computer');

// NOT N == Hole at N

// Obstacles:

// 1. (0 || (0 || (1 && 1))) && 1 === 1
//   @...@ 
// #####.###########

// 1. (1 || (1 || (1 && 1))) && 1 === 1
//     @...@ 
// #####...#########

// 1. (0 || (0 || (1 && 1))) && 1 === 1
// 2. (1 || (0 || (0 && 1))) && 1 === 1
//    @...@...@
// #####..#.########

// 1. (0 || (0 || (1 && 1))) && 1 === 1
// 2. (1 || (1 || (0 && 1))) && 1 === 1
//   @...@...@
// #####.#..########

// 1. (0 || (0 || (1 && 1))) && 1
//   @...@.
// #####.#@#...#.###

// 1. (1 || 0 || (1 && 1))) && 1
//     @...@...@...@
// #####.#.#...#.###

// #####...####.####

/**
 * Current program:
 * (Hole 1 away OR
 *      (Hole 2 away OR
 *          (Hole 3 away AND ground 4 away)
 *      )
 * ) AND ground 4 away
 */

let inputs = Computer.parseAsciiInputToArray(
`NOT C J
AND D J
NOT B T
OR T J
NOT A T
OR T J
AND D J
AND H J
RUN
`);

let ascii = new ASCII(memory, { inputs, pause_on_output: false });
ascii.run();
console.log(ascii.computer.flushOutputs());
