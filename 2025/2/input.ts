import path from 'path';
import fs from 'fs';

export type IdRange = {
	first: number;
	last: number;
};

function parse(filename: string): Array<IdRange> {
	return fs
		.readFileSync(path.join(import.meta.dirname, filename), 'utf8')
		.toString()
		.trim()
		.split(',')
		.map((numberPairs: string) => {
			const [firstStr, lastStr] = numberPairs.split('-');
			const first = parseInt(firstStr, 10);
			const last = parseInt(lastStr, 10);
			return { first, last };
		});
}

export const input = parse('input.txt');
export const sampleInput = parse('sample-input.txt');
