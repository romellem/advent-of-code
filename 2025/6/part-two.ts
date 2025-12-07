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
	const nextIndex = i !== operationIndices.length - 1 ? operationIndices[i + 1] : undefined;
	const currentBlock = digitBlocks.map((digitBlock) => digitBlock.slice(currentIndex, nextIndex));
	return currentBlock;
});

// console.log(JSON.stringify(problemBlocks[0], null, '  '));
// console.log(JSON.stringify(problemBlocks[1], null, '  '));
console.log(JSON.stringify(problemBlocks[5], null, '  '));
console.log(JSON.stringify(problemBlocks[36], null, '  '));
// console.log(JSON.stringify(problemBlocks[10], null, '  '));
