import { input } from './input';

const left = input.map(([a, b]) => a);
const right = input.map(([a, b]) => b);

const sortedLeft = left.slice().sort((a, b) => a - b);
const sortedRight = right.slice().sort((a, b) => a - b);

function zip<TItem>(left: TItem[], right: TItem[]): Array<[TItem, TItem]> {
	const result: Array<[TItem, TItem]> = [];
	for (let i = 0; i < left.length; i++) {
		result.push([left[i], right[i]]);
	}
	return result;
}

const answer = zip(sortedLeft, sortedRight)
	.map(([a, b]) => Math.abs(a - b))
	.reduce((acc, v) => acc + v, 0);

console.log(answer);
