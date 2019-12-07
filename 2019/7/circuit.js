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
	constructor(memory, inputs, clone_memory = false) {
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
				fn: (...a) => console.log('STOP', a),
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
	}

	run() {
		let op = this.parseOp();

		while (op.name !== STP) {
			this.runOp(op);
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
	// get _() {
	// 	return this.input.slice(Math.max(0, this.pointer - 1), this.pointer + 8);
	// }
}

class Circuit {
	constructor(memory, phase_settings) {
		this.memory = memory;
		this.phase_settings = phase_settings;
	}

	run(return_last_output = true) {
		// First computer gets 0 as its second input
		let last_computer_output = [0];
		for (let phase_seting of this.phase_settings) {
			let computer = new Computer(this.memory, [
				phase_seting,
				...last_computer_output,
			]);
			last_computer_output = computer.run();
		}


		return return_last_output ? last_computer_output.pop() : last_computer_output;
	}
}

module.exports = {
	Computer,
	Circuit,
};
