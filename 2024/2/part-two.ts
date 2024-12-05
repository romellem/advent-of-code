import { input } from './input';

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

function tolerableIsReportSafe(report: number[]): boolean {
	if (isReportSafe(report)) {
		return true;
	}

	for (let i = 0; i < report.length; i++) {
		const trimmedReport = report.slice();
		trimmedReport.splice(i, 1);

		if (isReportSafe(trimmedReport)) {
			return true;
		}
	}

	return false;
}

const answer = input.filter(tolerableIsReportSafe).length;
console.log(answer);
