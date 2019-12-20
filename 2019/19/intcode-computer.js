const readline = require('readline');
const { green, cyan } = require('colors');

const ADD = '01'; // Add
const MUL = '02'; // Multiply
const INP = '03'; // Input
const OUT = '04'; // Output
const JIT = '05'; // Jump-if-true
const JIF = '06'; // Jump-if-false
const LTH = '07'; // Less Than
const EQU = '08'; // Equals
const ARB = '09'; // Adjust relative base
const STP = '99'; // Stop

const POSITION_MODE = '0';
const IMMEDIATE_MODE = '1';
const RELATIVE_MODE = '2';

class Computer {
	constructor({
		memory,
		inputs = [],
		replenish_input = undefined,
		pause_on_output = true,
		id = 0,
		clone_memory = false,
	}) {
		// For debugging
		this.id = String.fromCharCode('A'.charCodeAt(0) + id);

		this.original_memory = clone_memory && memory.slice(0);
		this.memory = memory.slice(0);
		this.pointer = 0;
		this.relative_base = 0;
		this.pause_on_output = pause_on_output;

		this.inputs = Array.isArray(inputs) ? inputs.slice(0) : [inputs];
		this.replenish_input = replenish_input;
		this.outputs = [];

		this.OPS = {
			[ADD]: {
				name: ADD,
				realName: 'ADD',
				params: 3,
				fn: (a, b, c) => {
					this.memory[c] = a + b;
				},
				write: true,
			},

			[MUL]: {
				name: MUL,
				realName: 'MUL',
				params: 3,
				fn: (a, b, c) => {
					this.memory[c] = a * b;
				},
				write: true,
			},

			[INP]: {
				name: INP,
				realName: 'INP',
				params: 1,
				fn: a => {
					this.memory[a] = this.inputs.shift();
					if (this.replenish_input !== undefined) {
						this.inputs.push(this.replenish_input);
					}
				},
				write: true,
			},

			[OUT]: {
				name: OUT,
				realName: 'OUT',
				params: 1,
				fn: a => this.output(a),
			},

			[ARB]: {
				name: ARB,
				realName: 'ARB',
				params: 1,
				fn: a => (this.relative_base += a),
			},

			[STP]: {
				name: STP,
				realName: 'STP',
				params: 0,
				fn: () => (this.halted = true),
			},

			[JIT]: {
				name: JIT,
				realName: 'JIT',
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
				realName: 'JIF',
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
				realName: 'LTH',
				params: 3,
				fn: (a, b, c) => {
					this.memory[c] = a < b ? 1 : 0;
				},
				write: true,
			},

			[EQU]: {
				name: EQU,
				realName: 'EQU',
				params: 3,
				fn: (a, b, c) => {
					this.memory[c] = a === b ? 1 : 0;
				},
				write: true,
			},
		};

		this.halted = false;
	}

	run() {
		let op = this.parseOp();

		while (!this.halted) {
			this.runOp(op);

			/**
			 * In circuits, computer execution should be paused on outout so that value can be passed to the next computer.
			 * Additionally, execution should immediately stopped if we have halted.
			 */
			if ((this.pause_on_output && op.name === OUT) || this.halted) {
				break;
			}

			op = this.parseOp();
		}

		return this.outputs;
	}

	parseOp() {
		let temp_op = String(this.memory[this.pointer]).padStart(2, '0');

		// "The opcode is a two-digit number based only on the ones and tens digit of the value, that is, the opcode is the rightmost two digits of the first value in an instruction"
		let op = this.OPS[temp_op.substr(-2, 2)];

		let full_op = temp_op.padStart(op.params + 2, '0');

		let modes = [];

		// "Parameter modes are single digits, one per parameter, read **right-to-left** from the opcode"
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

			// Values can overflow existing memory. If so, value should be 0
			if (value === undefined) {
				value = 0;
			}

			// Immediate Mode uses the value as is, no need to make adjustments
			if (mode !== IMMEDIATE_MODE) {
				/**
				 * While working in Position or Relative Mode, it is (at first)
				 * unituitive why I need to _skip_ the value re-mapping if we
				 * are at the _last_ value to calculate.
				 *
				 * Consider the ADD operation `1001,9,8,7`.
				 *
				 * Parsing this out gives us:
				 *
				 *     ABCDE
				 *      1001
				 *
				 *     DE - two-digit opcode,      01 == opcode 1
				 *      C - mode of 1st parameter,  0 == position mode
				 *      B - mode of 2nd parameter,  1 == immediate mode
				 *      A - mode of 3rd parameter,  0 == position mode,
				 *                                  omitted due to being a leading zero
				 *
				 * If I were to write this addition operation as a standard made equation,
				 * where number literals (immediate mode) are written as the number, and
				 * position numbers are written with a prefixed `@` symbol, the equation
				 * might look like
				 *
				 *     @3 = @1 + 2
				 *
				 * Now, if I were to re-map the pointer'd `@` symbols, I'd get
				 *
				 *     @3 = @1 + 2
				 *
				 * But _that isn't what we want!_ Namely, it doesn't make sense
				 * to set the _literal_ number 7 equal to some addition operation.
				 *
				 * So, the assignment part _always_ retains its pointer aspect.
				 *
				 *     @3 = 9 + 2
				 *
				 * Because of this, when I do the re-mapping, I skip the last arugment
				 * whenever I am performing an operation that writes to memory. On operations
				 * that _don't_ write to memory, I can re-map regardless of which parameter I am
				 * inspecting.
				 *
				 * For example, on a JIT operation `5,3,4` (implicitly `0005,3,4`) on the computer
				 * `5,3,4,1001,0` would be executed as:
				 *
				 *     if @3 != 0; then Jump to @4
				 *
				 * Re-mapping these pointers to the values from memory, the code becomes
				 *
				 *     if 1001 != 0; then Jump to 0
				 *
				 * That is, even though the `@4` position parameter was the last parameter,
				 * I still performed the look up because the JIT op does _not_ write to memory.
				 *
				 * To, to recap, I want to re-map my value to the value stored in memory at
				 * a certain _position_ if:
				 *
				 * - I am running an op that does _not_ write to memory
				 * - Or if I am not at the last parameter in the op
				 */
				const can_switch_to_position = !write || i < modes.length - 1;

				if (can_switch_to_position && mode === POSITION_MODE) {
					value = this.memory[value];
				} else if (mode === RELATIVE_MODE) {
					/**
					 * In relative mode, value is always updated. However, again for the reasons
					 * above, the last parameter on operations that write to memory should only
					 * have the value adjusted by the relative base. For all other instances,
					 * the value should be looked up from memory (in a relative fashion, of course).
					 */
					if (can_switch_to_position) {
						value = this.memory[value + this.relative_base];
					} else {
						value = value + this.relative_base;
					}
				}
			}

			// After remapping (if any) again adjust to 0 if we overflowed our memory read
			if (value === undefined) {
				value = 0;
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
		return this.memory.slice(Math.max(0, this.pointer - 1), this.pointer + 8);
	}
}

class Screen {
	constructor(boundaries = { x: [0, 37], y: [0, 20] }) {
		this.grid = {};
		this.score = 0;
		this.paddle;

		// { x: [min_x, max_x], y: [min_y, max_y] }
		this.boundaries = boundaries;
	}

	paint(x, y, tile_id) {
		if (x === -1 && y === 0) {
			return (this.score = tile_id);
		}

		const coord = x + ',' + y;
		if (!this.grid[coord]) {
			this.grid[coord] = new Tile(x, y);
		}

		this.grid[coord].tile_id = tile_id;

		if (tile_id === PADDLE) {
			this.paddle = this.grid[coord];
		}
	}

	toString() {
		let screen = '';
		let [min_x, max_x] = this.boundaries.x;
		let [min_y, max_y] = this.boundaries.y;

		for (let y = min_y; y <= max_y; y++) {
			for (let x = min_x; x <= max_x; x++) {
				let coord = `${x},${y}`;
				let tile = this.grid[coord] || ' ';
				screen += tile.toString();
			}
			if (y === min_y) {
				screen += ' Score: ' + this.score;
			}
			screen += '\n';
		}

		return screen;
	}
}

const wait = (ms = 500) => new Promise(r => setTimeout(r, ms));

class TractorBeam {
	constructor(memory, options = {}) {
		this.memory = memory.slice(0);
		// this.computer = new Computer({ memory, pause_on_output: true, ...options });
		this.grid = new Array(50).fill().map(row => new Array(50).fill());
		// this.screen = new Screen();
	}

	partOne() {
		for (let x = 0; x < 50; x++) {
			for (let y = 0; y < 50; y++) {
				// The computer halts after every output, so we create a new one each time
				let computer = new Computer({ memory: this.memory, inputs: [x, y] });
				let output = computer.run();

				this.grid[y][x] = output.shift();
			}
		}
			
		
		let grid_str = this.grid.map(row => row.map(v => v ? '#' : '.').join('')).join('\n');
		console.log(grid_str);
		let points_affected = this.grid.map(row => row.reduce((a, b) => a + b)).reduce((a, b) => a + b);
		console.log(points_affected);
		
	}

	// Run after changing position `0` in the memory to the value `2`
	async freePlay() {
		let computer = this.computer;
		let output = this.computer.outputs;

		while (!computer.halted) {
			output = computer.run();
			if (computer.halted) {
				break;
			}

			if (output.length >= 3) {
				const x = output.shift();
				const y = output.shift();
				const tile_id = output.shift();
				let ms = 0;
				if (tile_id === BALL && this.screen.paddle) {
					ms = 3;
					// See if ball is to the left or right of paddle
					if (x < this.screen.paddle.x) {
						computer.inputs[0] = -1;
					} else if (x > this.screen.paddle.x) {
						computer.inputs[0] = 1;
					}
				}
				this.screen.paint(x, y, tile_id);

				if (this.print_game) {
					readline.cursorTo(process.stdout, 0, 0);
					console.log(this.screen.toString());
					await wait(ms);
				}
			}
		}

		let score_length = String(this.screen.score).length;
		let border = Array(2 + 2 + score_length).fill('-');
		border[0] = '+';
		border[border.length - 1] = '+';
		border = border.join('');

		console.log(cyan(border));
		console.log(green(`| ${this.screen.score} |`));
		console.log(cyan(border));
	}
}

module.exports = {
	Computer,
	TractorBeam,
};
