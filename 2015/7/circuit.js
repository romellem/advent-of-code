class Gate {
    constructor(id) {
        this.id = id;

        this.input;

        /**
         * Cache our value after we calculate it.
         * 
         * This part is key, otherwise the program never finishes? Also
         * it works because we don't call the `getValue()` method until
         * all gates are parsed.
         */
        this.calculatedValue;
    }

    getValue() {
        if (this.calculatedValue !== undefined) {
            return this.calculatedValue;
        }

        if (typeof this.input !== 'object') {
            this.calculatedValue = this.input;
        } else {
            let { gates, operator, not } = this.input;

            // This is a simplification, `NOT $gate` never has an operator
            let val;
            if (not) {
                val = ~gates[0].getValue();
                this.calculatedValue = val;
            } else if (operator) {
                let l, r;
                switch (operator) {
                    case 'AND':
                        l = gates[0].getValue();
                        r = gates[1].getValue();
                        val =l & r;
                        this.calculatedValue = val;
                        break;
                    case 'OR':
                        l = gates[0].getValue();
                        r = gates[1].getValue();
                        val =l | r;
                        this.calculatedValue = val;
                        break;
                    case 'RSHIFT':
                        l = gates[0].getValue();
                        r = gates[1].getValue();
                        val =l >> r;
                        this.calculatedValue = val;
                        break;
                    case 'LSHIFT':
                        l = gates[0].getValue();
                        r = gates[1].getValue();
                        val =l << r;
                        this.calculatedValue = val;
                        break;
                }

                return this.calculatedValue;

                // if we are here, something went wrong
                console.error(this);
                process.exit(1);
            } else {
                // Just a plain gate
                val = this.input.getValue();
                this.calculatedValue = val;
            }

            return this.calculatedValue;
        }
    }
}

const GATE_REGEX = /[a-z]+/g;

class Circuit {
    constructor(gates_array) {
        this.gates = this.parseGates(gates_array);
    }

    parseGates(gates_array) {
        let gates_map_of_ids = {};
        gates_array.forEach(gate_str => {
            let [input, output] = gate_str.split(' -> ');
            input = input.trim();
            output = output.trim();

            let output_gate;
            if (gates_map_of_ids[output]) {
                output_gate = gates_map_of_ids[output];
            } else {
                output_gate = new Gate(output);
                gates_map_of_ids[output] = output_gate;
            }

            // For the input, we have several possibilites...

            // First, test for NOTs. This is made simpler because they are `NOT $some_gate -> ...`, never more complicated that that.
            if (input.includes('NOT')) {
                let input_gate_id = input.replace('NOT ', '').trim();
                let input_gate;
                if (gates_map_of_ids[input_gate_id]) {
                    input_gate = gates_map_of_ids[input_gate_id];
                } else {
                    input_gate = new Gate(input_gate_id);
                    gates_map_of_ids[input_gate_id] = input_gate;
                }

                output_gate.input = {
                    not: true,
                    gates: [input_gate],
                };
            } else if (/^\d+$/.test(input)) {
                // Input is just a number, start of the circuit!
                output_gate.input = parseInt(input);
            } else if (/^[a-z]+$/.test(input)) {
                // Input is just a plain gate
                let input_gate;
                if (gates_map_of_ids[input]) {
                    input_gate = gates_map_of_ids[input];
                } else {
                    input_gate = new Gate(input);
                    gates_map_of_ids[input] = input_gate;
                }

                output_gate.input = input_gate;
            } else {
                // AND, OR, LSHIRT, RSHIFT, nothing, just a gate into another gate
                if (input.includes(' LSHIFT ')) {
                    let [input_left_id, input_right] = input.split(' LSHIFT ');
                    // Again, simplification. We always have `$GATE LSHIFT $INT`

                    let input_left;
                    if (gates_map_of_ids[input_left_id]) {
                        input_left = gates_map_of_ids[input_left_id];
                    } else {
                        input_left = new Gate(input_left_id);
                        gates_map_of_ids[input_left_id] = input_left;
                    }

                    output_gate.input = {
                        gates: [input_left, { getValue: () => parseInt(input_right.trim()) }],
                        operator: 'LSHIFT',
                    };
                } else if (input.includes(' RSHIFT ')) {
                    // This code isn't DRY, oh well
                    let [input_left_id, input_right] = input.split(' RSHIFT ');

                    let input_left;
                    if (gates_map_of_ids[input_left_id]) {
                        input_left = gates_map_of_ids[input_left_id];
                    } else {
                        input_left = new Gate(input_left_id);
                        gates_map_of_ids[input_left_id] = input_left;
                    }

                    output_gate.input = {
                        gates: [input_left, { getValue: () => parseInt(input_right) }],
                        operator: 'RSHIFT',
                    };
                } else if (input.includes(' AND ')) {
                    let [input_left_id, input_right_id] = input.split(' AND ');

                    let input_left;
                    if (/^\d+$/.test(input_left_id)) {
                        input_left = { getValue: () => parseInt(input_left_id) };
                    } else if (gates_map_of_ids[input_left_id]) {
                        input_left = gates_map_of_ids[input_left_id];
                    } else {
                        input_left = new Gate(input_left_id);
                        gates_map_of_ids[input_left_id] = input_left;
                    }

                    let input_right;
                    if (/^\d+$/.test(input_right_id)) {
                        input_right = { getValue: () => parseInt(input_right_id) };
                    } else if (gates_map_of_ids[input_right_id]) {
                        input_right = gates_map_of_ids[input_right_id];
                    } else {
                        input_right = new Gate(input_right_id);
                        gates_map_of_ids[input_right_id] = input_right;
                    }

                    output_gate.input = {
                        gates: [input_left, input_right],
                        operator: 'AND',
                    };
                } else if (input.includes(' OR ')) {
                    let [input_left_id, input_right_id] = input.split(' OR ');

                    let input_left;
                    if (/^\d+$/.test(input_left_id)) {
                        input_left = { getValue: () => parseInt(input_left_id) };
                    } else if (gates_map_of_ids[input_left_id]) {
                        input_left = gates_map_of_ids[input_left_id];
                    } else {
                        input_left = new Gate(input_left_id);
                        gates_map_of_ids[input_left_id] = input_left;
                    }

                    let input_right;
                    if (/^\d+$/.test(input_right_id)) {
                        input_right = { getValue: () => parseInt(input_right_id) };
                    } else if (gates_map_of_ids[input_right_id]) {
                        input_right = gates_map_of_ids[input_right_id];
                    } else {
                        input_right = new Gate(input_right_id);
                        gates_map_of_ids[input_right_id] = input_right;
                    }

                    output_gate.input = {
                        gates: [input_left, input_right],
                        operator: 'OR',
                    };
                }
            }
        });

        return gates_map_of_ids;
    }
}

module.exports = Circuit;
