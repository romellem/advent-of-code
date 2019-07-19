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
 */

const TOGGLE_TRANSFORMS = {
	inc: 'dec',
	dec: 'inc',
	tgl: 'inc',
	jnz: 'cpy',
	cpy: 'jnz',
};

class Device {
	constructor(program, starting_registers = { a: 7, b: 0, c: 0, d: 0 }, starting_instruction = 0) {
		// Clone the arrays we pass in
		this.program = JSON.parse(JSON.stringify(program));
		this.registers = JSON.parse(JSON.stringify(starting_registers));

		this.instruction = starting_instruction;

		this.run = this.run.bind(this);
	}

	// Used in debugging registers
	get r() {
		let { a, b, c, d } = this.registers;
		return `a:${a} b:${b} c:${c} d:${d}`;
	}

	// Used in debugging current op
	get o() {
		let { op, args } = this.program[this.instruction];
		return `${op} ${args.map(v => '' + v).join(' ')}`;
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
}

module.exports = Device;
