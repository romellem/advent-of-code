/**
 * `cpy x y` _copies_ `x` (either an integer or the _value_ of a register) into register `y`.
 * `inc x` _increases_ the value of register `x` by one.
 * `dec x` _decreases_ the value of register `x` by one.
 * `jnz x y` _jumps_ to an instruction `y` away (positive means forward; negative means backward), but only if `x` is _not zero_.
 *
 * `tgl x` _toggles_ the instruction `x` away (pointing at instructions like `jnz` does: positive means forward; negative means backward):
 *   - For _one-argument_ instructions, `inc` becomes `dec`, and all other one-argument instructions become `inc`.
 *   - For _two-argument_ instructions, `jnz` becomes `cpy`, and all other two-instructions become `jnz`.
 *   - The arguments of a toggled instruction are _not affected_.
 *   - If an attempt is made to toggle an instruction outside the program, _nothing happens_.
 *   - If toggling produces an _invalid instruction_ (like `cpy 1 2`) and an attempt is later made to execute that instruction, `skip it instead`.
 *   - If `tgl` toggles _itself_ (for example, if `a` is `0`, `tgl a` would target itself and become `inc a`), the resulting instruction is not executed until the next time it is reached.
 *
 * `out x` _transmits_ `x` (either an integer or the _value_ of a register) as the next value for the clock signal.
 */

const TOGGLE_TRANSFORMS = {
	inc: 'dec',
	dec: 'inc',
	tgl: 'inc',
	jnz: 'cpy',
	cpy: 'jnz',
	out: 'inc',
};

class Device {
	constructor(
		program,
		starting_registers = {},

		// Arbitrary 6 chars, of course this doesn't mean this will go on forever necessarily...
		exit_on = '010101',
		starting_instruction = 0
	) {
		// Defaults all registers to 0. Allows you to pass in just one register than you want to change
		const default_registers = { a: 0, b: 0, c: 0, d: 0 };
		starting_registers = Object.assign({}, default_registers, starting_registers);

		// Clone the arrays we pass in
		this.program = JSON.parse(JSON.stringify(program));
		this.registers = JSON.parse(JSON.stringify(starting_registers));

		this.instruction = starting_instruction;

		this.exit_on = exit_on;
		this.signal = '';

		this.run = this.run.bind(this);
		this.step = this.step.bind(this);
	}

	printRegisters() {
		console.log(this.registers);
	}

	run(register_to_print = 'a') {
		let line = this.program[this.instruction];

		while (line) {
			let { op, args } = line;

			// Run the opcode
			this[op].apply(this, args);

			line = this.program[this.instruction];
		}

		return this.registers[register_to_print];
	}

	step(n = 1) {
		for (let i = 0; i < n; i++) {
			const { op, args } = this.program[this.instruction];;

			// Run the opcode
			this[op].apply(this, args);
		}
	}

	/**
	 * @returns {Boolean} - Returns true if we reached our exit condition, returns false if we can't reach exit condition
	 */
	runUntilExitCondition() {
		while (true) {
			const { op } = this.program[this.instruction];

			this.step();

			// If we just ran `out`, check our signal and see if it matches the exit condition
			if (op === 'out') {
				if (this.signal === this.exit_on) {
					return true;
				} else if (this.signal.length > this.exit_on.length) {
					return false;
				} else {
					// The signal is less than our exit string, so check that exit starts with the signla so far
					// If it doesn't we can exit early.
					if (this.exit_on.indexOf(this.signal) !== 0) {
						return false;
					}
				}
			}
		}
	}

	getValueOf(x) {
		return typeof x === 'string' ? this.registers[x] : x;
	}

	/**
	 * Opcodes
	 */

	// Copy - copies `x` (either an integer or the value of a register) into register `y`.
	cpy(x, y) {
		this.instruction++;

		// Invalid instruction, skip
		if (typeof y !== 'string') {
			return;
		}

		this.registers[y] = this.getValueOf(x);

		return this.registers;
	}

	// Increase - increases the value of register `x` by one.
	inc(x) {
		this.registers[x] += 1;

		this.instruction++;

		return this.registers;
	}

	// Decrease - decreases the value of register `x` by one.
	dec(x) {
		this.registers[x] -= 1;

		this.instruction++;

		return this.registers;
	}

	// Jump - jumps to an instruction `y` away (positive means forward; negative means backward), but only if `x` is not zero.
	jnz(x, y) {
		x = this.getValueOf(x);
		y = this.getValueOf(y);

		if (x === 0) {
			// Then just move forward as normal
			this.instruction++;
		} else {
			// Otherwise, jump our instruction
			this.instruction += y;
		}

		return this.registers;
	}

	// Toggle
	tgl(x) {
		x = this.getValueOf(x);

		let instruction_to_modify = this.instruction + x;
		if (this.program[instruction_to_modify]) {
			let current_op = this.program[instruction_to_modify].op;
			this.program[instruction_to_modify].op = TOGGLE_TRANSFORMS[current_op];
		}

		this.instruction++;
	}

	// Transmit out to our device's "signal"
	out(x) {
		x = this.getValueOf(x);
		this.signal += x;

		this.instruction++;
	}
}

module.exports = Device;
