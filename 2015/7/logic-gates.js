class Gate {
    constructor(id) {
        this.id = id;

        this.not = false;
        this.operator = '';
        // this.
    }
}

const GATE_REGEX = /[a-z]+/g;

class LogicGates {
    constructor(gates_array) {
        this.gates = this.parseGates(gates_array);
    }

    parseGates(gates_array) {
        let gates_map_of_ids = {};
        gates_array.forEach(gate_str => {
            let [input, output] = gate_str.split(' -> ');
            input = input.trim();
            output = output.trim();

            let output_gate = new Gate(output);

            // For the input, we have several possibilites...

            // First, test for NOTs
        });
    }
}

module.exports = LogicGates;