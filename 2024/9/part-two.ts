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

const freespace: Array<Freespace> = [];
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
		freespace.push({
			start: index,
			end: index + num,
			size: num,
		});
	}

	index += num;
}

/**
 * Unoptimized, loop free space in order until we find one that is
 * at least the size of the file we care about.
 */
function findFreeSpace(file: File): Freespace | undefined {
	for (let block of freespace) {
		if (block.start < file.start && block.size >= file.size) {
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

let checksum = 0;
// Compute checksum and move files at the same time
for (let i = files.length - 1; i >= 0; i--) {
	let endFile = files[i];
	let freeSpace = findFreeSpace(endFile);

	if (freeSpace !== undefined) {
		endFile.start = freeSpace.start;
		endFile.end = freeSpace.start + endFile.size;

		freeSpace.start = endFile.end;
		freeSpace.size -= endFile.size;
	}

	checksum += partialChecksumForFile(endFile);
}

console.log(checksum);
