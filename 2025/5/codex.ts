import fs from 'fs';

type Interval = { start: bigint; end: bigint };

const rawInput = fs.readFileSync(new URL('./input.txt', import.meta.url), 'utf8');

const [rangeSection, idSection] = rawInput.trim().split(/\n\s*\n/);

const ranges: Interval[] = rangeSection
	.trim()
	.split(/\n+/)
	.map((line) => {
		const [start, end] = line.trim().split('-');
		return { start: BigInt(start), end: BigInt(end) };
	});

// Merge overlapping or touching intervals so membership checks and lengths are simple.
const mergedRanges = (() => {
	const sorted = [...ranges].sort((a, b) => {
		if (a.start === b.start) return a.end < b.end ? -1 : a.end > b.end ? 1 : 0;
		return a.start < b.start ? -1 : 1;
	});

	const merged: Interval[] = [];
	for (const current of sorted) {
		const last = merged[merged.length - 1];
		if (!last) {
			merged.push({ ...current });
			continue;
		}

		if (current.start <= last.end + 1n) {
			last.end = current.end > last.end ? current.end : last.end;
		} else {
			merged.push({ ...current });
		}
	}
	return merged;
})();

const ids: bigint[] = idSection
	.trim()
	.split(/\n+/)
	.filter(Boolean)
	.map((line) => BigInt(line.trim()));

const isInAnyRange = (value: bigint, intervals: Interval[]): boolean => {
	for (const interval of intervals) {
		if (value < interval.start) break;
		if (value <= interval.end) return true;
	}
	return false;
};

let freshAvailableCount = 0;
for (const id of ids) {
	if (isInAnyRange(id, mergedRanges)) {
		freshAvailableCount += 1;
	}
}

const totalFreshIds = mergedRanges.reduce(
	(sum, interval) => sum + (interval.end - interval.start + 1n),
	0n
);

console.log(`Part 1: ${freshAvailableCount}`);
console.log(`Part 2: ${totalFreshIds.toString()}`);
