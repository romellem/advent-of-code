import { input } from './input';

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

/**
 * Have two pointers, start and end, and iterate until
 * the start surpasses the end point.
 */
let start = disk.indexOf(undefined);
let end = disk.length - 1;

// console.log({ start, end }, disk.map((v) => (v === undefined ? '.' : String(v))).join(''));

while (start < end) {
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
