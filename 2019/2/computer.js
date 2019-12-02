const ADD = 1;
const MULTP = 2;
const STOP = 99;

class Computer {
	constructor(input) {
		this.input = input.slice(0);
	}

	// Defaults are for part one
	run(noun, verb) {
		let input = this.input.slice(0);
		input[1] = noun;
		input[2] = verb;

		for (let i = 0; i < input.length; i += 4) {
			let op = input[i];
			let num1 = input[i + 1];
			let num2 = input[i + 2];
			let dest = input[i + 3];

			if (op === ADD) {
				input[dest] = input[num1] + input[num2];
			} else if (op === MULTP) {
				input[dest] = input[num1] * input[num2];
			} else if (op === STOP) {
				break;
			}
		}

		return input[0];
	}

	partOne() {
		return this.run(12, 2);
	}

	partTwo() {
		let nums = Array(100)
			.fill(0)
			.map((c, i) => i);

		for (let noun of nums) {
			for (let verb of nums) {
				let position_zero = this.run(noun, verb);

				if (position_zero === 19690720) {
					return 100 * noun + verb;
				}
			}
		}
	}
}

module.exports = Computer;
