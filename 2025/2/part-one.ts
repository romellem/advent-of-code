import { input } from './input';
import { buildPrefixSums, generateRepeatedNumbers, sumInRange } from './utils';

// Precompute every number that repeats a chunk exactly twice up to the global max.
// Example: chunk=123 -> 123123. We only build this list once.
const maxValue = Math.max(...input.map(({ last }) => last));
const repeatedTwice = generateRepeatedNumbers(maxValue, { minRepeats: 2, maxRepeats: 2 });
const prefix = buildPrefixSums(repeatedTwice);

// Each range can now be answered in O(log n) (binary search + prefix sums).
const sum = input.reduce((total, { first, last }) => {
	return total + sumInRange(repeatedTwice, prefix, first, last);
}, 0);

console.log('Part 1:', sum);
