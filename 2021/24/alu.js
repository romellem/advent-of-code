export class ALU {
	constructor(instructions, input) {
		this.instructions = [...instructions];
		this.registers = {
			w: 0,
			x: 0,
			y: 0,
			z: 0,
		};
		this.steps = [];

		this.input = Array.isArray(input)
			? [...input]
			: String(input)
					.split('')
					.map((v) => +v);
		this.input_copy = [...this.input];
	}

	get(value_or_register) {
		return /[wxyz]/.test(value_or_register)
			? this.registers[value_or_register]
			: parseInt(value_or_register, 10);
	}

	// inp a - Read an input value and write it to variable a.
	inp(register) {
		this.steps.push({ ...this.registers });
		this.registers[register] = this.input.shift();
	}
	// add a b - Add the value of a to the value of b, then store the result in variable a.
	add(a, b) {
		this.registers[a] += this.get(b);
	}
	// mul a b - Multiply the value of a by the value of b, then store the result in variable a.
	mul(a, b) {
		this.registers[a] *= this.get(b);
	}
	// div a b - Divide the value of a by the value of b, truncate the result to an integer, then store the result in variable a. (Here, "truncate" means to round the value toward zero.)
	div(a, b) {
		this.registers[a] = Math.trunc(this.get(a) / this.get(b));
	}
	// mod a b - Divide the value of a by the value of b, then store the remainder in variable a. (This is also called the modulo operation.)
	mod(a, b) {
		this.registers[a] %= this.get(b);
	}
	// eql a b - If the value of a and b are equal, then store the value 1 in variable a. Otherwise, store the value 0 in variable a.
	eql(a, b) {
		this.registers[a] = this.get(a) === this.get(b) ? 1 : 0;
	}

	run() {
		for (let instruction of this.instructions) {
			let [op, ...args] = instruction.split(' ');
			console.log(instruction, { op, args });

			this[op](...args);
		}

		this.steps.push({ ...this.registers });
	}

	reset() {
		this.input = [...this.input_copy];
		this.steps = [];
	}
}
