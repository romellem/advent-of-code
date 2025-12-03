/**
 * Constraints describing how many times a numeric chunk must repeat.
 * `maxRepeats` defaults to infinity so callers can opt into "at least" logic.
 */
type RepeatConstraints = {
	minRepeats: number;
	maxRepeats?: number;
};

const DEFAULT_MAX_REPEAT = Number.MAX_SAFE_INTEGER;

/**
 * Precompute powers of ten so we can build repeated numbers purely with math.
 * Example: createPowersOfTen(4) => [1, 10, 100, 1000, 10000].
 */
function createPowersOfTen(count: number): Array<number> {
	const powers = new Array<number>(count + 1);
	powers[0] = 1;
	for (let i = 1; i <= count; i++) {
		powers[i] = powers[i - 1] * 10;
	}
	return powers;
}

/**
 * Generate every number <= `maxValue` whose decimal representation is a smaller
 * chunk repeated a fixed number of times. This lets us precompute the entire
 * search space once and reuse it for each range instead of re-evaluating every
 * integer in that range.
 *
 * Example: chunkLength=2, chunk=47, repeats=3 -> 474747.
 * We stop iterating once repeating a chunk would exceed `maxValue`, since any
 * larger chunk or additional repeat would also exceed it.
 */
export function generateRepeatedNumbers(maxValue: number, constraints: RepeatConstraints): Array<number> {
	const { minRepeats, maxRepeats = DEFAULT_MAX_REPEAT } = constraints;
	const maxDigits = maxValue.toString().length;
	const powers = createPowersOfTen(maxDigits);
	const numbers = new Set<number>();

	for (let chunkLength = 1; chunkLength * minRepeats <= maxDigits; chunkLength++) {
		const chunkStart = powers[chunkLength - 1];
		const chunkEnd = powers[chunkLength] - 1;
		const chunkBase = powers[chunkLength];
		const chunkMaxRepeats = Math.min(Math.floor(maxDigits / chunkLength), maxRepeats);

		if (chunkMaxRepeats < minRepeats) {
			continue;
		}

		for (let chunk = chunkStart; chunk <= chunkEnd; chunk++) {
			let stopChunk = false;

			for (let repeats = minRepeats; repeats <= chunkMaxRepeats; repeats++) {
				const totalDigits = chunkLength * repeats;
				/**
				 * Geometric series converts `chunk` (e.g. 123) into `123123` purely with math:
				 * `multiplier = 10^(6) - 1 / (10^(3) - 1) = 1000000 - 1 / 1000 - 1 = 1001`.
				 * `candidate = chunk * multiplier = 123 * 1001 = 123123`.
				 */
				const multiplier = (powers[totalDigits] - 1) / (chunkBase - 1);
				const candidate = chunk * multiplier;

				if (candidate > maxValue) {
					// Any further repeats only make the number larger; optionally bail on this chunk.
					if (repeats === minRepeats) {
						stopChunk = true;
					}
					break;
				}

				numbers.add(candidate);
			}

			if (stopChunk) {
				// The base chunk already exceeded maxValue with minimal repeats; larger chunks will too.
				break;
			}
		}
	}

	return Array.from(numbers).sort((a, b) => a - b);
}

/**
 * Prefix sums allow O(1) sum queries once we know the index bounds.
 * Example: values = [11, 22, 99] -> prefix = [0, 11, 33, 132].
 * The sum of elements 1..2 (22 + 99) is prefix[3] - prefix[1] = 121.
 */
export function buildPrefixSums(values: Array<number>): Array<number> {
	const prefix = new Array<number>(values.length + 1);
	prefix[0] = 0;

	for (let i = 0; i < values.length; i++) {
		prefix[i + 1] = prefix[i] + values[i];
	}

	return prefix;
}

function lowerBound(values: Array<number>, target: number): number {
	let low = 0;
	let high = values.length;

	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (values[mid] < target) {
			low = mid + 1;
		} else {
			high = mid;
		}
	}

	return low;
}

function upperBound(values: Array<number>, target: number): number {
	let low = 0;
	let high = values.length;

	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (values[mid] <= target) {
			low = mid + 1;
		} else {
			high = mid;
		}
	}

	return low;
}

/**
 * Sum all values within [lower, upper] using binary search on the sorted
 * candidate list plus the prefix sums computed above.
 * For example, with values [11, 22, 99], prefix [0, 11, 33, 132], and range 20-100:
 * - lowerBound gives index 1 (first value >= 20), upperBound gives 3 (first value > 100).
 * - prefix[3] - prefix[1] = 132 - 11 = 121 -> 22 + 99.
 */
export function sumInRange(values: Array<number>, prefix: Array<number>, lower: number, upper: number): number {
	if (values.length === 0 || lower > upper) {
		return 0;
	}

	const left = lowerBound(values, lower);
	const right = upperBound(values, upper);

	if (left >= right) {
		return 0;
	}

	return prefix[right] - prefix[left];
}
