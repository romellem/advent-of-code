import path from 'path';
import fs from 'fs';

export const input: Array<[number, number]> = fs
	.readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line: string) => {
		const [a, b] = line.split(/\s+/).map((v) => parseInt(v, 10));
		return [a, b];
	});
