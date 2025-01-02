import { sampleInput as input } from './input';
const totalDiskSize = input.reduce((acc, v) => acc + v, 0);

const disk: Array<number | undefined> = Array(totalDiskSize).fill(undefined);

// Fill the disk
let id = 0;
let index = 0;
for (let i = 0; i < input.length; i++) {
	const num = input[i];

	const isFile = i % 2 === 0;

	if (isFile) {
		for (let n = 0; n < num; n++) {
			disk[index + n] = id;
		}
	} else {
		// Free space
		id++;
	}

	index += num;
}

let start = disk.indexOf(undefined);
let end = disk.length;

function findLastFullFile(): undefined | [number, number] {
	let beginning = end - 1;
	if (start > beginning) {
		return undefined;
	}

	let fileId = disk[beginning];
	while (disk[beginning] === fileId) {
		beginning--;
	}
	beginning++;

	if (start > beginning) {
		return undefined;
	}

	return [beginning, end];
}

function getFreeSpaceBlocks(): Map<number, number> {
	if (start > end) {
		return new Map();
	}

	// Array of indices for free space
	let freespace: Array<number> = [];
	for (let i = start; i < end; i++) {
		if (disk[i] === undefined) {
			freespace.push(i);
		}
	}

	if (freespace.length === 0) {
		return new Map();
	} else if (freespace.length === 1) {
		return new Map([[1, freespace[0]]]);
	}

	// Key is the size, and value is the start index of the block
	let blocks = new Map<number, number>();
	let size = 0;
	for (let i = 0; i < freespace.length; i++) {
		size++;
		let current = freespace[i];
		let next: number | undefined = freespace[i + 1];

		// We'll end this case for the last block as well (e.g., when `next` is `undefined`)
		if (next !== current + 1) {
			if (!blocks.has(size)) {
				/**
				 * Let's say we have a disk that looks like
				 *
				 *   index: 0123456789
				 *    disk: 11...22..3
				 *
				 * So we'd have freespace array that looks like
				 *
				 *   [2,3,4,7,8]
				 *
				 * In this example, the first time we his this `else` block,
				 * `current = 4`, and `next = 7`. So, we want to record a block size
				 * of 3, starting at index 2.
				 *
				 * To calculate that, take the fact that `current` is the last index of the block,
				 * and subtract the size to move over the just before the start of the block.
				 * Add 1 to bump the pointer to the actual start point.
				 *
				 * The math in this example then is `4 - 3 + 1` = 2, which is the start of the 3 sized block!
				 */
				blocks.set(size, current - size + 1);
			}
			size = 0;
		}
	}

	return blocks;
}
let q = 0;

// Move our file IDs to chunks of free space!
while (true) {
	if (q++ > 50) {
		break;
	}
	let startStr = ' '.repeat(start) + 's';
	let endStr = ' '.repeat(end - start - 1) + 'e';
	console.log(startStr + endStr);
	console.log(disk.map((v) => v ?? '.').join(''));

	const fileParts = findLastFullFile();
	if (fileParts === undefined) {
		break;
	}

	console.log(fileParts.join(','), disk.slice(...fileParts));

	const [startFile, endFile] = fileParts;
	const fileId = disk[startFile];
	const size = endFile - startFile;
	const freespace = getFreeSpaceBlocks();

	if (freespace.has(size)) {
		const startFree = freespace.get(size)!;
		for (let i = 0; i < size; i++) {
			let freeIndex = startFree + i;
			let fileIndex = startFile + i;

			disk[freeIndex] = fileId;
			disk[fileIndex] = undefined;
		}

		end = startFile;
		start = startFree + size;
	}
}

// Compute checksum
let checksum = 0;
for (let i = 0; i < disk.length; i++) {
	let block = disk[i];
	if (block === undefined) {
		continue;
	}

	checksum += block * i;
}

console.log(checksum);
