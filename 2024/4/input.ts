import path from 'path';
import fs from 'fs';

export type Grid = Array<Array<string>>;

export const input: Grid = fs
	.readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line: string) => {
		return line.split('');
	});

export const sampleInput: Grid = fs
	.readFileSync(path.join(import.meta.dirname, 'sample-input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line: string) => {
		return line.split('');
	});
