import { input } from './input.js';
import { getVariableCommands } from './alu.js';

const digits = Array(9)
	.fill()
	.map((_, i) => i + 1);

const isValidDigit = (digit) => digit >= 1 && digit <= 9;

const restraints = getVariableCommands(input).reduce(
	(vars, { stackOp, value }, i) => {
		const { stack, lines } = vars;
		if (stackOp === 'push') {
			stack.push({ value, i });
		} else {
			const head = stack.pop();
			// i = head.i + (head.value + value)
			lines.push({
				left: i,
				right: head.i,
				value: head.value + value,
			});
		}

		return vars;
	},
	{ stack: [], lines: [] }
).lines;

function getNumberFromRestraints(restraints) {
	let result = Array(14).fill(0);
	for (let restraint of restraints) {
		const right_input = Math.min(...digits.filter((d) => isValidDigit(restraint.value + d)));
		const left_input = right_input + restraint.value;
		result[restraint.left] = left_input;
		result[restraint.right] = right_input;
	}

	return result.join('');
}

console.log(getNumberFromRestraints(restraints));
