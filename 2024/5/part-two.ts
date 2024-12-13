import { orderingRules, pages } from './input';

// a|b means a < b & b > a
const keyIsLessThan = new Map<number, Set<number>>();
const keyIsGreaterThan = new Map<number, Set<number>>();
for (let [a, b] of orderingRules) {
	if (!keyIsLessThan.has(a)) {
		keyIsLessThan.set(a, new Set());
	}
	if (!keyIsGreaterThan.has(b)) {
		keyIsGreaterThan.set(b, new Set());
	}
	keyIsLessThan.get(a)!.add(b);
	keyIsGreaterThan.get(b)!.add(a);
}

function sortPage(a: number, b: number): -1 | 1 | 0 {
	if (keyIsLessThan.get(a)?.has(b) || keyIsGreaterThan.get(b)?.has(a)) {
		return -1;
	}
	if (keyIsLessThan.get(b)?.has(a) || keyIsGreaterThan.get(a)?.has(b)) {
		return 1;
	}
	return 0;
}

function isOrdered(page: number[]) {
	const sortedPage = page.toSorted(sortPage);
	return sortedPage.join(',') === page.join(',');
}

const unorderedPages = pages.filter((page) => !isOrdered(page));
const newlySortedPages = unorderedPages.map((page) => page.toSorted(sortPage));
const newlySortedPagesMiddleDigit = newlySortedPages.map((page) => {
	// return middle digit
	return page[Math.trunc(page.length / 2)];
});

const sum = newlySortedPagesMiddleDigit.reduce((acc, v) => acc + v, 0);

console.log(sum);
