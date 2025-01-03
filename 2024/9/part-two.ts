import { input } from './input';
console.time('part-two');

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

	/**
	 * Based on the input, we never have a file of size 0,
	 * but check it anyway for correctness. If we did,
	 * skip it.
	 */
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
		 * of 0 size. For completeness sake, if we had a 0 size file that we
		 * skipped, then expand the last freespace block to include this one.
		 *
		 * Debugging the code, this never happens.
		 */
		const lastFreespace = freespace[freespace.length - 1];
		if (lastFreespace?.end === index) {
			lastFreespace!.end += num;
			lastFreespace!.size += num;
		} else {
			freespace.push({
				start: index,
				end: index + num,
				size: num,
			});
		}
	}

	index += num;
}

const freespaceMap = new Map<number, Array<Freespace>>(
	Array(9)
		.fill(0)
		.map((_, i) => [i + 1, []])
);

for (let block of freespace) {
	freespaceMap.get(block.size)!.push(block);
}

function findFreeSpace(file: File): Freespace | undefined {
	const validFreespaces = Array.from(freespaceMap.entries())
		.map(([, blocks]) => blocks[0])
		.filter((block: Freespace | undefined) => {
			if (!block) {
				return false;
			}

			return block.start < file.start && block.size >= file.size;
		})
		.sort((a, b) => a.start - b.start);

	return validFreespaces[0];
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
	const endFile = files[i];
	const freeSpace = findFreeSpace(endFile);

	if (freeSpace !== undefined) {
		endFile.start = freeSpace.start;
		endFile.end = freeSpace.start + endFile.size;

		const oldSize = freeSpace.size;
		freeSpace.start = endFile.end;
		freeSpace.size -= endFile.size;

		// Rebalance the freespace map
		freespaceMap.get(oldSize)!.shift();
		if (freeSpace.size > 0) {
			freespaceMap.get(freeSpace.size)!.push(freeSpace);
			freespaceMap.get(freeSpace.size)!.sort((a, b) => a.start - b.start);
		}
	}

	checksum += partialChecksumForFile(endFile);
}

console.log(checksum);
console.timeEnd('part-two');
