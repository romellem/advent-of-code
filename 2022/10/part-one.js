const { input } = require('./input');

let reg = {
	x: 1,
};

let cycle = new Map();

let stack = [];
for (let i = 0; i < input.length; i++) {
	let [op, n] = input[i];
	if (op === 'addx') {
		stack.push({ count: 2, n });
	}

	for (let j = 0; j < stack.length; j++) {
		let s = stack[j];
		s.count--;
		if (!s.count) {
			reg.x += s.n;
			stack.splice(j, 1);
			j--;
		}
	}

	if (i + 1 === 20 || (i > 59 && (i + 1 - 20) % 40 === 0)) {
		cycle.set(i + 1, reg.x * (i + 1));
	}
}

let sum = [
	cycle.get(20),
	cycle.get(60),
	cycle.get(100),
	cycle.get(140),
	cycle.get(180),
	cycle.get(220),
].reduce((a, b) => a + b, 0);

console.log(sum);
