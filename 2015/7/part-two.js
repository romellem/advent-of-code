const { input } = require('./input');
const Circuit = require('./circuit');

let circuit = new Circuit(input);
const part_one = circuit.gates['a'].getValue();

/**
 * Take the signal you got on [part one] override wire `b` to that signal,
 * and reset the other wires.
 */
const part_two_input = input.map((line) => {
    if (/ -> b$/.test(line)) {
        return `${part_one} -> b`;
    } else {
        return line;
    }
});

circuit = new Circuit(part_two_input);
const part_two = circuit.gates['a'].getValue();
console.log(part_two);
