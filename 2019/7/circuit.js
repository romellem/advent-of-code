const ADD = '01'; // Add
const MUL = '02'; // Multiply
const INP = '03'; // Input
const OUT = '04'; // Output
const JIT = '05'; // Jump-if-true
const JIF = '06'; // Jump-if-false
const LTH = '07'; // Less Than
const EQU = '08'; // Equals
const STP = '99'; // Stop

const POSITION_MODE = '0';
const IMMEDIATE_MODE = '1';

class Computer {
	constructor(memory, inputs, id, clone_memory = false) {
		// For debugging
		this.id = String.fromCharCode('A'.charCodeAt(0) + id);

		this.original_memory = clone_memory && memory.slice(0);
		this.memory = memory.slice(0);
		this.pointer = 0;

		this.inputs = Array.isArray(inputs) ? inputs.slice(0) : [inputs];
		this.outputs = [];

		this.OPS = {
			[ADD]: {
				name: ADD,
				params: 3,
				fn: (a, b, c) => (this.memory[c] = a + b),
				write: true,
			},

			[MUL]: {
				name: MUL,
				params: 3,
				fn: (a, b, c) => (this.memory[c] = a * b),
				write: true,
			},

			[INP]: {
				name: INP,
				params: 1,
				fn: a => (this.memory[a] = this.inputs.shift()),
				write: true,
			},

			[OUT]: {
				name: OUT,
				params: 1,
				fn: a => this.output(a),
			},

			[STP]: {
				name: STP,
				params: 0,
				fn: () => (this.halted = true),
			},

			[JIT]: {
				name: JIT,
				params: 2,
				fn: (a, b) => {
					if (a) {
						this.pointer = b;
						return true;
					}
					return false;
				},
				jumps: true,
			},

			[JIF]: {
				name: JIF,
				params: 2,
				fn: (a, b) => {
					if (!a) {
						this.pointer = b;
						return true;
					}
					return false;
				},
				jumps: true,
			},

			[LTH]: {
				name: LTH,
				params: 3,
				fn: (a, b, c) => (this.memory[c] = a < b ? 1 : 0),
				write: true,
			},

			[EQU]: {
				name: EQU,
				params: 3,
				fn: (a, b, c) => (this.memory[c] = a === b ? 1 : 0),
				write: true,
			},
		};

		this.halted = false;
	}

	run() {
		let op = this.parseOp();

		while (!this.halted) {
			this.runOp(op);

			// Pause executing the computer so this output can be given to the next computer
			// Additionally, break if we've halted
			if (op.name === OUT || this.halted) {
				break;
			}

			op = this.parseOp();
		}

		return this.outputs;
	}

	parseOp() {
		let temp_op = String(this.memory[this.pointer]).padStart(2, '0');
		let op = this.OPS[temp_op.substr(-2, 2)];

		let full_op = temp_op.padStart(op.params + 2, '0');

		let modes = [];

		for (let i = op.params - 1; i >= 0; i--) {
			modes.push(full_op[i]);
		}

		return {
			...op,
			modes,
		};
	}

	runOp({ modes, fn, jumps, write }) {
		this.pointer++;
		let values = [];
		for (let i = 0; i < modes.length; i++) {
			let mode = modes[i];
			let value = this.memory[this.pointer + i];

			const can_switch_to_position = !write || i < modes.length - 1;
			if (can_switch_to_position && mode === POSITION_MODE) {
				value = this.memory[value];
			}

			values.push(value);
		}

		// If result is `true`, we moved the pointer
		let result = fn(...values);

		if (!jumps || (jumps && !result)) {
			this.pointer += modes.length;
		}
	}

	output(v) {
		this.outputs.push(v);
	}

	// For debugging
	get _() {
		return this.memory.slice(
			Math.max(0, this.pointer - 1),
			this.pointer + 8
		);
	}
}

class Circuit {
	constructor(memory, phase_settings, circuit_size = 5) {
		this.memory = memory;
		this.phase_settings = phase_settings;
		this.circuit = Array(circuit_size)
			.fill()
			.map((c, i) => {
				let phase_setting = [phase_settings[i]];
				if (i === 0) {
					// "The first amplifier's input value is 0"
					phase_setting.push(0);
				}

				return new Computer(memory, phase_setting, i);
			});

		this.current_computer = 0;
	}

	run() {
		let computer = this.circuit[this.current_computer];
		let output, last_output;

		while (!computer.halted) {
			let new_output = computer.run();
			if (computer.halted) {
				break;
			}

			output = new_output;

			let next_computer = this.moveToNextComputer();

			// `output.pop` removes the value from the computers `this.outputs` array,
			// meaning the next computer effectively "consumes" the value
			last_output = output.shift();
			next_computer.inputs.push(last_output);

			computer = next_computer;
		}

		return last_output;
	}

	moveToNextComputer() {
		this.current_computer++;
		this.current_computer %= this.circuit.length;

		return this.circuit[this.current_computer];
	}
}

module.exports = {
	Computer,
	Circuit,
};
