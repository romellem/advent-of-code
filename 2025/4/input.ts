import path from 'path';
import fs from 'fs';

export const PAPER = '@' as const;
export const EMPTY = '.' as const;

export type Paper = typeof PAPER;
export type Empty = typeof EMPTY;

function parse(filename: string) {
	return fs
		.readFileSync(path.join(import.meta.dirname, filename), 'utf8')
		.toString()
		.trim()
		.split('\n')
		.map((line: string) => {
			return line.split('') as Array<Paper | Empty>;
		});
}

export const input = parse('input.txt');
export const sampleInput = parse('sample-input.txt');
