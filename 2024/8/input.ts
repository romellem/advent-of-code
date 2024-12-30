import path from 'path';
import fs from 'fs';

export const input: Array<Array<string>> = fs
	.readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line, y) => {
		return line.split('');
	});

export const sampleInput: Array<Array<string>> = fs
	.readFileSync(path.join(import.meta.dirname, 'sample-input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line, y) => {
		return line.split('');
	});
