import path from 'path';
import fs from 'fs';

type Point = {
	char: string;
	x: number;
	y: number;
};

export const input: Array<Point> = fs
	.readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line, y) =>
		line.split('').map((char, x) => {
			return {
				char,
				x,
				y,
			};
		})
	)
	.flat();
