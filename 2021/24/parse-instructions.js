import { input } from './input.js';

function translateOp(op) {
	// inp a - Read an input value and write it to variable a.
	if (op.startsWith('inp')) {
		let [, a] = op.split(' ');
		return `${a} = input;`;
	}

	// add a b - Add the value of a to the value of b, then store the result in variable a.
	if (op.startsWith('add')) {
		let [, a, b] = op.split(' ');
		return `${a} += ${b};`;
	}
	// mul a b - Multiply the value of a by the value of b, then store the result in variable a.
	if (op.startsWith('mul')) {
		let [, a, b] = op.split(' ');
		return `${a} *= ${b};`;
	}
	// div a b - Divide the value of a by the value of b, truncate the result to an integer, then store the result in variable a. (Here, "truncate" means to round the value toward zero.)
	if (op.startsWith('div')) {
		let [, a, b] = op.split(' ');
		return `${a} = Math.trunc(${a} / ${b});`;
	}
	// mod a b - Divide the value of a by the value of b, then store the remainder in variable a. (This is also called the modulo operation.)
	if (op.startsWith('mod')) {
		let [, a, b] = op.split(' ');
		return `${a} %= ${b};`;
	}
	// eql a b - If the value of a and b are equal, then store the value 1 in variable a. Otherwise, store the value 0 in variable a.
	if (op.startsWith('eql')) {
		let [, a, b] = op.split(' ');
		return `${a} = ${a} === ${b} ? 1 : 0;`;
	}
}

class Command {
	constructor(raw) {
		this.raw = raw;
	}

	toString() {
		return `\t// ${this.raw}\n\t${translateOp(this.raw)}`;
	}
}

let current_func = [];
let program = [];
for (let line of input) {
	if (current_func.length && line.startsWith('inp')) {
		program.push(`function part${program.length + 1}(input) {
${current_func.join('\n\n')}
}`);
		current_func = [];
	}

	current_func.push(new Command(line));
}

program.push(`function part${program.length + 1}(input) {
${current_func.join('\n\n')}
}`);

for (let p of program) {
	console.log(p + '\n');
}
