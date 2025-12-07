import { input, type Operations } from './input';

const { textBlock } = input;

/**
 * All operations characters ('+' and '*') are aligned to the left-most digit of the largest number.
 * Leverage this fact and find all indices of the operations, then use those to slice out text block chunks.
 */
const textBlocksRows = textBlock.split('\n').filter((v) => v);
const lastRow = textBlocksRows.at(-1)!;
const digitBlocks = textBlocksRows.slice(0, -1);

const operationIndices: number[] = [];
for (let i = 0; i < lastRow.length; i++) {
	const char = lastRow[i];
	if (char !== ' ') {
		operationIndices.push(i);
	}
}

const problemBlocks = operationIndices.map((currentIndex, i) => {
	/**
	 * Being at the last index means there is no "next" index, so set this to `undefined` which
	 * when used with `slice` means "slice until the end of the string".
	 *
	 * Otherwise, use the next index *minus 1* so we don't grab the space in between the problems
	 *
	 *   1     1
	 *   23   23
	 *   456 456
	 *   +   +
	 *   -------
	 *   0123456 <- index
	 *   ^   ^
	 *
	 *   Slicing each row from `(0, 4)` would grab (say from the last row) `"456 "`, but I don't want
	 *   the trailing space, so slice `(0, 4 - 1)`
	 */
	const nextIndex = i !== operationIndices.length - 1 ? operationIndices[i + 1] - 1 : undefined;
	const currentBlock = digitBlocks.map((digitBlock) => digitBlock.slice(currentIndex, nextIndex));
	return currentBlock;
});

/**
 * Now walk downward to build up new numbers. We walk from left-to-right
 * for convenience, even though technically the problem says to walk right-to-left.
 * This doesn't matter because addition and multiplication are commutative (aka,
 * `124 + 35 + 6` = `6 + 35 + 124`).
 */
const cephalopodProblems = problemBlocks.map((problemBlock, i) => {
	// All strings are same length, grab the first one to see how many columns we need to walk
	const numColumns = problemBlock[0].length;

	const verticalDigits: Array<Array<string>> = Array(numColumns)
		.fill(undefined)
		.map((v) => []);
	for (let c = 0; c < numColumns; c++) {
		const colNum = verticalDigits[c];
		for (let y = 0; y < problemBlock.length; y++) {
			const row = problemBlock[y];
			const colChar = row[c];
			colNum.push(colChar);
		}
	}

	const digits = verticalDigits.map((digitList) => {
		const paddedNumStr = digitList.join('');
		const numStr = paddedNumStr.trim();
		return parseInt(numStr);
	});

	const operation = lastRow[i] as Operations;

	return {
		digits,
		operation,
	};
});

function evaluateProblem(problem: { digits: number[]; operation: Operations }) {
	const { digits, operation } = problem;
	if (operation === '*') {
		return digits.reduce((a, b) => a * b, 1);
	}

	// Otherwise its addition
	return digits.reduce((a, b) => a + b, 0);
}

const answers = cephalopodProblems.map((problem) => evaluateProblem(problem));
const answersSum = answers.reduce((a, b) => a + b, 0);

console.log('Part 2:', answersSum);
