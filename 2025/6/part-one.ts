import { input, type Operations } from './input';

const { problems } = input;

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

console.log('Part 1:', answersSum);
