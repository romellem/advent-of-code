import { input } from './input';

const mulTokens = input.matchAll(/mul\(\d{1,3},\d{1,3}\)/g);
const numPairs = Array.from(mulTokens).map((capture) => {
	const [match] = capture;
	const [, numA, numB] = /mul\((\d{1,3}),(\d{1,3})\)/.exec(match) || [];
	return [parseInt(numA, 10), parseInt(numB, 10)];
});

const answer = numPairs.map(([a, b]) => a * b).reduce((acc, v) => acc + v, 0);
console.log(answer);
