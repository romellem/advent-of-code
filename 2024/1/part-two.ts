import { input } from './input';

const left = input.map(([a, b]) => a);
const right = input.map(([a, b]) => b);

const rightMap: Record<number, number> = {};
for (let v of right) {
	rightMap[v] ??= 0;
	rightMap[v]++;
}

const answer = left
	.map((v) => {
		const timesInRight = rightMap[v] ?? 0;
		return v * timesInRight;
	})
	.reduce((acc, v) => acc + v, 0);

console.log(answer);
