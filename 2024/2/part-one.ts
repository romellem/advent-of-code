import { input } from './input';

/**
 * So, a report only counts as safe if both of the following are true:
 *
 * - The levels are either _all increasing_ or _all decreasing_.
 * - Any two adjacent levels differ by _at least one_ and _at most three_.
 */

function isReportSafe(report: number[]): boolean {
	const [first, second] = report;

	let isIncreasing = first < second;
	let isDecreasing = second < first;

	if (!isIncreasing && !isDecreasing) {
		return false;
	}

	for (let i = 0; i < report.length - 1; i++) {
		const current = report[i];
		const next = report[i + 1];

		if (isIncreasing && !(next > current)) {
			return false;
		}

		if (isDecreasing && !(next < current)) {
			return false;
		}

		const diff = Math.abs(current - next);

		if (diff < 1 || diff > 3) {
			return false;
		}
	}

	// If we are here, the report passes!
	return true;
}

const answer = input.filter(isReportSafe).length;
console.log(answer);
