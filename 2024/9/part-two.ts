import { input } from './input';

type File = {
	id: number;
	start: number;
	end: number;
	size: number;
};
type Freespace = {
	start: number;
	end: number;
	size: number;
};

const freespaces: Array<Freespace> = [];
const files: Array<File> = [];

// Fill the disk, but keep track of freespace and files separately
let id = 0;
let index = 0;
for (let i = 0; i < input.length; i++) {
	const num = input[i];

	const isFile = i % 2 === 0;
	id += isFile ? 0 : 1;

	if (num === 0) {
		continue;
	}

	if (isFile) {
		files.push({
			id,
			start: index,
			end: index + num,
			size: num,
		});
	} else {
		/**
		 * Based on the input, we never have a file of size 0, only freespace
		 * of 0 size. For completeness sake, if we had a 0 size file, then
		 * expand the last freespace block to include this one rather than
		 * pushing on a new block.
		 */
		const lastFreespace = freespaces.at(-1);
		if (lastFreespace?.end === index) {
			lastFreespace!.end += num;
			lastFreespace!.size += num;
		} else {
			freespaces.push({
				start: index,
				end: index + num,
				size: num,
			});
		}
	}

	index += num;
}

// Initialize all possible sizes to guarantee that we'll have an array
const freespaceMap = new Map<number, Array<Freespace>>(
	Array(9)
		.fill(0)
		.map((_, i) => [i + 1, []])
);

for (let block of freespaces) {
	// These lists will be intially sorted since freespace was ordered when it was generated
	freespaceMap.get(block.size)!.push(block);
}

/**
 * The one bit of complex overengineering I added.
 * By keeping track of the sorted freespace blocks by size,
 * we can improve on "linearly search freespaces for first valid one"
 * by:
 *
 * 1. Take the first freespace block of each size, since these lists are sorted.
 * 2. Filter out the ones that do not exist before the file.
 * 3. Filter out the ones that are too small for the file.
 * 4. Finally, make sure to take the earliest valid ones.
 *
 * The only thing we need to do afterward is to update the freespace map.
 */
function findFreespace(file: File): Freespace | undefined {
	const validFreespaces = Array.from(freespaceMap.entries())
		.map(([, blocks]) => blocks[0])
		.filter((block: Freespace | undefined) => {
			// We might not have a freespace of a certain size left
			if (!block) {
				return false;
			}

			return block.start < file.start && block.size >= file.size;
		})
		.sort((a, b) => a.start - b.start);

	return validFreespaces[0];
}

// Original (and more simple) way of finding the first available freespace.
function findFreespaceSlow(file: File): Freespace | undefined {
	for (let block of freespaces) {
		/**
		 * If we are at a freespace block that is after the file,
		 * exit early. We won't find a valid freespace to move the file
		 * into.
		 */
		if (block.start > file.start) {
			return undefined;
		}

		if (block.size >= file.size) {
			return block;
		}
	}

	return undefined;
}

function partialChecksumForFile(file: File): number {
	let partialChecksum = 0;
	for (let i = file.start; i < file.end; i++) {
		partialChecksum += i * file.id;
	}

	return partialChecksum;
}

const moveFile = (file: File, freespace: Freespace) => {
	file.start = freespace.start;
	file.end = freespace.start + file.size;
};

const rebalanceFreespace = (freespace: Freespace, file: File) => {
	// Pop the freespace off before we change its size
	freespaceMap.get(freespace.size)!.shift();

	freespace.start = file.end;
	freespace.size -= file.size;

	if (freespace.size > 0) {
		freespaceMap.get(freespace.size)!.push(freespace);
		freespaceMap.get(freespace.size)!.sort((a, b) => a.start - b.start);
	}
};

/**
 * Compute checksum and move files at the same time.
 * This makes the whole thing much easier. I don't need
 * to "replace" a file with free space. I only need to
 * update the indices of the file and "shrink" the freespace.
 */
let checksum = 0;
for (let i = files.length - 1; i >= 0; i--) {
	const endFile = files[i];
	const freeSpace = findFreespace(endFile);

	if (freeSpace !== undefined) {
		moveFile(endFile, freeSpace);
		rebalanceFreespace(freeSpace, endFile);
	}

	checksum += partialChecksumForFile(endFile);
}

console.log(checksum);
