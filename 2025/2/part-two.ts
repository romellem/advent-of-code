import { input } from './input';
import { buildPrefixSums, generateRepeatedNumbers, sumInRange } from './utils';

// Same idea as part 1, but allow any number of repeats >= 2 (e.g. 7 copies of "1").
const maxValue = Math.max(...input.map(({ last }) => last));
const repeatedIds = generateRepeatedNumbers(maxValue, { minRepeats: 2 });
const prefix = buildPrefixSums(repeatedIds);

const sum = input.reduce((total, { first, last }) => {
	return total + sumInRange(repeatedIds, prefix, first, last);
}, 0);

console.log('Part 2:', sum);
