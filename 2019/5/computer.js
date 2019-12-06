const ADD = '01';
const MUL = '02';
const INP = '03';
const OUT = '04';
const STP = '99';

const POSITION_MODE = '0';
const IMMEDIATE_MODE = '1';

class Computer {
	constructor(input, input_value = 1) {
		this.original_input = input.slice(0);
		this.input = input.slice(0);
		this.pointer = 0;

		this.input_value = input_value;
		this.output_value = null;

		this.OPS = {
			[ADD]: {
				name: ADD,
				params: 3,
				fn: (a, b, c) => (this.input[c] = a + b),
			},

			[MUL]: {
				name: MUL,
				params: 3,
				fn: (a, b, c) => (this.input[c] = a * b),
			},

			[INP]: {
				name: INP,
				params: 1,
				fn: a => (this.input[a] = this.input_value),
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
		};
	}

	run() {
		let op = this.parseOp();

		while (op.name !== STP) {
			this.runOp(op);
			op = this.parseOp();
		}
	}

	parseOp() {
		let temp_op = String(this.input[this.pointer]).padStart(2, '0');
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

	runOp({ modes, fn, name }) {
		this.pointer++;
		let values = [];
		for (let i = 0; i < modes.length; i++) {
			let mode = modes[i];
			let value = this.input[this.pointer + i];
			if (((i < modes.length - 1 && name !== INP) || name === OUT)&& mode === POSITION_MODE) {
				value = this.input[value];
			}

			values.push(value);
		}

		fn(...values);
		this.pointer += modes.length;
	}

	output(v) {
		console.log(v);
		if (v !== 0) {
			// console.error(this.pointer, this.input.join(','));
			throw v;
		}
	}

	get _() {
		return this.input.slice(Math.max(0, this.pointer - 1), this.pointer + 8);
	}
}

module.exports = Computer;
