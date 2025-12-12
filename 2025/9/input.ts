import path from 'path';
import fs from 'fs';

function parse(filename: string) {
	return fs
		.readFileSync(path.join(import.meta.dirname, filename), 'utf8')
		.toString()
		.trim()
		.split('\n')
		.map((line: string) => {
			const [x, y] = line.split(',').map((v) => parseInt(v, 10));
			return { x, y };
		});
}

export const input = parse('input.txt');
export const sampleInput = parse('sample-input.txt');
