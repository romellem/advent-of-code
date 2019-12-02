/**
 * `cpy x y` _copies_ `x` (either an integer or the _value_ of a register) into register `y`.
 * `inc x` _increases_ the value of register `x` by one.
 * `dec x` _decreases_ the value of register `x` by one.
 * `jnz x y` _jumps_ to an instruction `y` away (positive means forward; negative means backward), but only if `x` is _not zero_.
 */

class Device {
	constructor(
		program,
		starting_registers = { a: 0, b: 0, c: 0, d: 0 },
		starting_instruction = 0
	) {
		// Clone the arrays we pass in
		this.program = JSON.parse(JSON.stringify(program));
		this.registers = JSON.parse(JSON.stringify(starting_registers));

		this.instruction = starting_instruction;

		this.run = this.run.bind(this);
	}

	printRegisters() {
		console.log(this.registers);
	}

	run(register_to_print = "a") {
		let line = this.program[this.instruction];

		while (line) {
			let { op, args } = line;

			// Run the opcode
			this[op].apply(this, args);

			line = this.program[this.instruction];
		}

		return this.registers[register_to_print];
	}

	/**
	 * Opcodes
	 */

	// Copy - copies `x` (either an integer or the value of a register) into register `y`.
	cpy(x, y) {
		if (typeof x === "string") {
			// Copy register x into register y
			this.registers[y] = this.registers[x];
		} else {
			this.registers[y] = x;
		}

		this.instruction++;

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
		x = typeof x === "string" ? this.registers[x] : x;

		if (x === 0) {
			// Then just move forward as normal
			this.instruction++;
		} else {
			// Otherwise, jump our instruction
			this.instruction += y;
		}

		return this.registers;
	}
}

module.exports = Device;
