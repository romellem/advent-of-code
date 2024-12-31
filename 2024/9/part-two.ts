import { input } from './input';

type File = {
	type: 'file';
	size: number;
	index: number;
	id: number;
};

type FreeSpace = {
	type: 'free-space';
	size: number;
	index: number;
};

const disk: Array<File | FreeSpace> = [];

// Fill the disk with contiguous chunks
let id = 0;
for (let i = 0; i < input.length; i++) {
	const num = input[i];

	const isFile = i % 2 === 0;

	if (isFile) {
		disk.push({
			type: 'file',
			size: num,
			index: i,
			id,
		});
	} else {
		id++;
		disk.push({
			type: 'free-space',
			size: num,
			index: i,
		});
	}
}

const sortFreeSpaceBySize = () => {
	const freeSpaces = disk.filter((v) => v.type === 'free-space');
	freeSpaces.sort((a, b) => {
		if (a.size === b.size) {
			// sort by index if size is the same
			return a.index - b.index;
		}
		return a.size - b.size;
	});

	const freeSpaceMap = new Map<number, Array<FreeSpace>>();
	for (let freeSpace of freeSpaces) {
		const { size } = freeSpace;
		if (!freeSpaceMap.has(size)) {
			freeSpaceMap.set(size, []);
		}
		freeSpaceMap.get(size)!.push(freeSpace);
	}

	return freeSpaceMap;
};

const getFirstFreeSpaceThatCanFit = (size: number) => {
	const freeSpaceMap = sortFreeSpaceBySize();
	const possibleFreeSpaces: Array<FreeSpace> = [];
	for (let [freeSize, freeSpaces] of freeSpaceMap) {
		if (freeSize >= size) {
			possibleFreeSpaces.push(freeSpaces[0]);
		}
	}

	possibleFreeSpaces.sort((a, b) => a.index - b.index);
	return possibleFreeSpaces[0];
};

function move(file: File, freeSpace: FreeSpace) {
	const fileIndex = disk.indexOf(file);
	const freeSpaceIndex = disk.indexOf(freeSpace);
}

/**
 * Have four pointers, startA & startB and endA & endB
 * They span the first full empty block, and the last
 * full block. Each "B" pointer points to just _after_
 * the value, so I can easily slice that.
 *
 *                 endA    endB
 *     startA startB  |    |
 *          ↓ ↓       ↓    ↓
 *         0..111.....22222
 *
 * the start surpasses the end point.
 */
let startA = disk.indexOf(undefined);
let startB = startA;
while (disk[startB] === undefined) {
	startB++;
}

// Ahve `endB` but one past the end, so the full length (0 indices and all)
let endB = disk.length;
let endBValue = disk[endB - 1];
let endA = endB;
while (disk[endA] !== endBValue) {
	endA--;
}
// We went just past the value in the above loop, so tick it forward 1 after
endA++;

const startSize = () => startB - startA;
const endSize = () => endB - endA;

while (startB < endA) {
	if (disk[start] !== undefined) {
		start++;
		continue;
	}
	if (disk[end] === undefined) {
		end--;
		continue;
	}

	disk[start] = disk[end];
	disk[end] = undefined;
}

// Compute checksum
let checksum = 0;
for (let i = 0; i < disk.length; i++) {
	let block = disk[i];
	if (block === undefined) {
		break;
	}

	checksum += block * i;
}

console.log(checksum);
