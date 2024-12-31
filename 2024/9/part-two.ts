import { sampleInput as input } from './input';

type File = {
	type: 'file';
	data: Array<number>;
	index: number;
};

type FreeSpace = {
	type: 'free-space';
	data: Array<undefined>;
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
			data: Array(num).fill(id),
			index: i,
		});
	} else {
		id++;
		disk.push({
			type: 'free-space',
			data: Array(num).fill(undefined),
			index: i,
		});
	}
}

const freeSpaces = disk.filter((v) => v.type === 'free-space');
freeSpaces.sort((a, b) => {
	if (a.data.length === b.data.length) {
		// sort by index if size is the same
		return a.index - b.index;
	}
	return a.data.length - b.data.length;
});

const freeSpaceMap = new Map<number, Array<FreeSpace>>();
for (let freeSpace of freeSpaces) {
	const size = freeSpace.data.length;
	if (!freeSpaceMap.has(size)) {
		freeSpaceMap.set(size, []);
	}
	freeSpaceMap.get(size)!.push(freeSpace);
}

function getFirstFreeSpaceThatCanFit(size: number): FreeSpace | undefined {
	const possibleFreeSpaces: Array<FreeSpace> = [];
	for (let [freeSize, freeSpaces] of freeSpaceMap) {
		if (freeSize >= size) {
			possibleFreeSpaces.push(freeSpaces[0]);
		}
	}

	possibleFreeSpaces.sort((a, b) => a.index - b.index);
	return possibleFreeSpaces[0];
}

function tryToMoveFileToFreeSpace(file: File) {
	const freespace = getFirstFreeSpaceThatCanFit(file.data.length);
	if (!freespace) {
		return;
	}

	// Remove file from the end
	disk.splice(file.index, 1);

	// Insert file before free space, potentially shifting all subsequent indices
	disk.splice(freespace.index, 0, file);

	// Resize freespace
	const newFreespaceSize = freespace.data.length - file.data.length;
	if (newFreespaceSize === 0) {
		// Remove free space entirely, no need to update other objects' indices
		freeSpaceMap.get(freespace.data.length)!.shift();
		disk.splice(freespace.index + 1, 1);
	} else {
		// Remove free space from current size, it will change
		freeSpaceMap.get(freespace.data.length)!.shift();
		freespace.data.length = newFreespaceSize;

		// Update indices of all other objects, include currently resize freespace
		for (let i = freespace.index; i < disk.length; i++) {
			disk[i].index++;
		}

		// Update lookup map
		if (!freeSpaceMap.has(newFreespaceSize)) {
			freeSpaceMap.set(newFreespaceSize, []);
		}

		freeSpaceMap.get(newFreespaceSize)!.push(freespace);

		// Heap
		freeSpaceMap.get(newFreespaceSize)!.sort((a, b) => a.index - b.index);
	}
}

// We update the `disk` when moving files, so use a different list that is stable
const files = disk.filter((v) => v.type === 'file');

console.log(
	disk
		.flatMap((v) => v.data)
		.map((v) => v ?? '.')
		.join('')
);
for (let i = files.length - 1; i >= 0; i--) {
	const file = files[i];
	tryToMoveFileToFreeSpace(file);
	console.log(
		disk
			.flatMap((v) => v.data)
			.map((v) => v ?? '.')
			.join('')
	);
}

// Compute checksum
// let checksum = 0;
// for (let i = 0; i < flatDisk.length; i++) {
// 	let block = flatDisk[i];
// 	if (block === undefined) {
// 		continue;
// 	}

// 	checksum += block * i;
// }

// console.log(checksum);
