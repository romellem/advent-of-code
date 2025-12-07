import { input, type Operations } from './input';

const { problems } = input;

const columnwiseProblems = problems.map((problem) => {
	const { digits, operation } = problem;

	/**
	 * Calcuate the number with the most digits. This value will be used to ...
	 * Shit this won't work. Consider
	 *
	 *   1     1
	 *   23   23
	 *   456 456
	 *   +   +
	 *
	 * Those should be parsed to `6 + 35 + 124` and `136 + 25 + 4`. By parsing to
	 * regular numbers, I lose where the padding existed. I need to parse the raw text block.
	 */
	const digitsStr = digits.map((v) => v.toString());
	const maxDigitLength = Math.max(...digitsStr.map((digitStr) => digitStr.length));
});

function evaluateProblem(problem: { digits: number[]; operation: Operations }) {
	const { digits, operation } = problem;
	if (operation === '*') {
		return digits.reduce((a, b) => a * b, 1);
	}

	// Otherwise its addition
	return digits.reduce((a, b) => a + b, 0);
}

const answers = problems.map((problem) => evaluateProblem(problem));
const answersSum = answers.reduce((a, b) => a + b, 0);

console.log('Part 2:', answersSum);
