import path from 'path';
import fs from 'fs';

export const input = fs
	.readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line: string) => {
		const nums = line.split(/\s+/).map((v) => parseInt(v, 10));
		return nums;
	});
