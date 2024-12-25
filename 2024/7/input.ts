import path from 'path';
import fs from 'fs';

export const input: Array<{ result: number; numbers: number[] }> = fs
	.readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line: string) => {
		const [result, numbers] = line.split(':');
		return {
			result: parseInt(result, 10),
			numbers: numbers
				.trim()
				.split(' ')
				.map((v) => parseInt(v, 10)),
		};
	});

export const sampleInput: Array<{ result: number; numbers: number[] }> = fs
	.readFileSync(path.join(import.meta.dirname, 'sample-input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line: string) => {
		const [result, numbers] = line.split(':');
		return {
			result: parseInt(result, 10),
			numbers: numbers
				.trim()
				.split(' ')
				.map((v) => parseInt(v, 10)),
		};
	});
