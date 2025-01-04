import { orderingRules, pages } from './input';

// a|b means a < b
const keyIsLessThan = new Map<number, Set<number>>();
for (let [a, b] of orderingRules) {
	if (!keyIsLessThan.has(a)) {
		keyIsLessThan.set(a, new Set());
	}
	keyIsLessThan.get(a)!.add(b);
}

function isLessThan(a: number, b: number) {
	return keyIsLessThan.get(a)?.has(b) ?? false;
}

function sortPage(a: number, b: number): -1 | 1 | 0 {
	// a < b
	if (isLessThan(a, b)) {
		return -1;
	}

	// a > b
	if (isLessThan(b, a)) {
		return 1;
	}

	// a == b
	return 0;
}

function isOrdered(page: number[]) {
	const sortedPage = page.toSorted(sortPage);
	return sortedPage.join(',') === page.join(',');
}

const orderedPagesMiddleDigit = pages
	.filter((page) => isOrdered(page))
	.map((page) => {
		// return middle digit
		return page[Math.trunc(page.length / 2)];
	});

const sum = orderedPagesMiddleDigit.reduce((acc, v) => acc + v, 0);

console.log(sum);
