import { orderingRules, pages } from './input';

const keyIsLessThan = new Map<number, Set<number>>();
for (let [a, b] of orderingRules) {
	if (!keyIsLessThan.has(a)) {
		keyIsLessThan.set(a, new Set());
	}
	keyIsLessThan.get(a)!.add(b);
}

const digits = Array.from(new Set(orderingRules.flat()));
function quicksort(arr: number[]): number[] {
	// Base case: if the array is length 0 or 1, it's already sorted
	if (arr.length < 2) {
		return arr;
	}

	// Select a pivot (using the middle element here)
	const pivotIndex = Math.floor(arr.length / 2);
	const pivot = arr[pivotIndex];

	// Arrays for less and greater elements
	const less = [];
	const greater = [];

	// Partition step: compare every element (except the pivot) to the pivot
	for (let i = 0; i < arr.length; i++) {
		if (i === pivotIndex) {
			continue;
		}
		const current = arr[i];
		const currentIsLessThanPivot = keyIsLessThan.get(current)?.has(pivot);
		if (currentIsLessThanPivot) {
			less.push(current);
		} else {
			greater.push(current);
		}
	}

	// Recursively apply quicksort to the subarrays and then concatenate
	return [...quicksort(less), pivot, ...quicksort(greater)];
}

const sorted = quicksort(digits);
console.log(sorted);
