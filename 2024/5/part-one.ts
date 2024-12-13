import { orderingRules, pages } from './input';

const gt = new Map<number, Set<number>>();
for (let [a, b] of orderingRules) {
	if (!gt.has(a)) {
		gt.set(a, new Set());
	}
	gt.get(a)?.add(b);
}

const digits = Array.from(new Set(orderingRules.flat()));

const sortedDigits = [...digits].sort((a, b) => {
	if (gt.has(a) && gt.get(a)?.has(b)) {
		return -1;
	} else if (gt.has(b) && gt.get(b)?.has(a)) {
		return 1;
	} else {
		return 0;
	}
});

console.log(sortedDigits);
