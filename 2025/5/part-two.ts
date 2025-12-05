import { input } from './input';

const { ranges: unsortedRanges, ingredients } = input;
const ranges = unsortedRanges.sort((a, z) => a.low - z.low);

type Range = (typeof ranges)[number];

// Add in first range to ensure easier looping
// since we won't have to deal with the empty array edge case
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

const counts = compactRanges.map(({ low, high }) => high - low + 1);
const sumOfCounts = counts.reduce((a, b) => a + b, 0);

console.log('Part 2:', sumOfCounts);
