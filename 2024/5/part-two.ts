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

function isOrdered(page: number[]) {
	for (let i = 0; i < page.length - 1; i++) {
		for (let j = i + 1; j < page.length; j++) {
			const a = page[i];
			const b = page[j];
			if (!keyIsLessThan.get(a)?.has(b) && !keyIsGreaterThan.get(b)?.has(a)) {
				return false;
			}
		}
	}

	return true;
}

const unorderedPages = pages.filter((page) => !isOrdered(page));

const newlySortedPages = unorderedPages.map((page) => {
	const sortedPage = page.slice().sort((a, b) => {
		if (keyIsLessThan.get(a)?.has(b) || keyIsGreaterThan.get(b)?.has(a)) {
			return -1;
		}
		if (keyIsLessThan.get(b)?.has(a) || keyIsGreaterThan.get(a)?.has(b)) {
			return 1;
		}
		return 0;
	});
	return sortedPage;
});

const newlySortedPagesMiddleDigit = newlySortedPages.map((page) => {
	// return middle digit
	return page[Math.trunc(page.length / 2)];
});

const sum = newlySortedPagesMiddleDigit.reduce((acc, v) => acc + v, 0);

console.log(sum);
