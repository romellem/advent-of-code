const { input } = require("./input");

const ADD = 1;
const MULTP = 2;
const STOP = 99;

const findInput = () => {
	let nums = Array(100)
		.fill(0)
		.map((c, i) => i);

	while (true) {
		for (let noun of nums) {
			for (let verb of nums) {
				const list = input.slice(0);
				list[1] = noun;
				list[2] = verb;

				for (let i = 0; i < list.length; i += 4) {
					let op = list[i];
					let num1 = list[i + 1];
					let num2 = list[i + 2];
					let dest = list[i + 3];

					if (op === ADD) {
						list[dest] = list[num1] + list[num2];
					} else if (op === MULTP) {
						list[dest] = list[num1] * list[num2];
					} else if (op === STOP) {
						break;
					}
				}

				if (list[0] === 19690720) {
					return 100 * noun + verb;
				}
			}
		}
	}
};

let ans = findInput();

console.log(ans);
