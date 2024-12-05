import { input } from './input';

/**
 * So, a report only counts as safe if both of the following are true:
 *
 * - The levels are either _all increasing_ or _all decreasing_.
 * - Any two adjacent levels differ by _at least one_ and _at most three_.
 */

function tolerableIsReport(report: number[]): boolean {
	let [first, second] = report;

	let isIncreasing = first < second;
	let isDecreasing = second < first;

	if (!isIncreasing && !isDecreasing) {
		// Try again but remove the first digit
		return tolerableIsReport(report.slice(1));
	}

	let badReports = 0;
	for (let i = 0; i < report.length - 1; i++) {
		const current = report[i];
		const next = report[i + 1];

		if (isIncreasing && !(next > current)) {
			badReports++;
			if (badReports > 1) {
				return false;
			}
		}

		if (isDecreasing && !(next < current)) {
			badReports++;
			if (badReports > 1) {
				return false;
			}
		}

		const diff = Math.abs(current - next);

		if (diff < 1 || diff > 3) {
			badReports++;
			if (badReports > 1) {
				return false;
			}
		}
	}

	// If we are here, the report passes!
	return true;
}

const answer = input.filter(tolerableIsReport).length;
console.log(answer);
