import { input } from './input';

const { ranges: unsortedRanges } = input;

/**
 * Sorting the ranges ahead of time (by its "low" end) is the trick.
 * After sorting, you can iterate these in order to compact them.
 */
const ranges = unsortedRanges.sort((a, z) => a.low - z.low);

type Range = (typeof ranges)[number];

const compactRanges: Array<Range> = [];

for (let i = 0; i < ranges.length; i++) {
	const nextRange = ranges[i];
	const previousRange = compactRanges.at(-1);

	if (previousRange && nextRange.low <= previousRange.high) {
		previousRange.high = Math.max(nextRange.high, previousRange.high);
	} else {
		// No overlap, insert new range
		compactRanges.push(nextRange);
	}
}

const counts = compactRanges.map(({ low, high }) => {
	// Range of `1 - 5` doesn't include `5 - 1 = 4` numbers:
	// 1 2 3 4 5
	// It includes 5. Aka, `(5 - 1) + 1`.
	return high - low + 1;
});
const sumOfCounts = counts.reduce((a, b) => a + b, 0);

console.log('Part 2:', sumOfCounts);
