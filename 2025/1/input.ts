import path from 'path';
import fs from 'fs';

export type Direction = 'L' | 'R';

export type InputAction = {
	direction: Direction;
	degree: number;
};

export const input: Array<InputAction> = fs
	.readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line: string) => {
		const direction = line.at(0) as Direction;
		const degree = parseInt(line.slice(1), 10);
		return { direction, degree };
	});

export const sampleInput: Array<InputAction> = fs
	.readFileSync(path.join(import.meta.dirname, 'sample-input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line: string) => {
		const direction = line.at(0) as Direction;
		const degree = parseInt(line.slice(1), 10);
		return { direction, degree };
	});
