import path from 'path';
import fs from 'fs';

export const input: Array<number> = fs
	.readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('')
	.map((char: string) => {
		return parseInt(char, 10);
	});

export const sampleInput: Array<number> = fs
	.readFileSync(path.join(import.meta.dirname, 'sample-input.txt'), 'utf8')
	.toString()
	.trim()
	.split('')
	.map((char: string) => {
		return parseInt(char, 10);
	});
