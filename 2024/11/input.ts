import path from 'path';
import fs from 'fs';

export const input: Array<number> = fs
	.readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split(' ')
	.map((num: string) => {
		return parseInt(num, 10);
	});
