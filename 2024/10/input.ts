import path from 'path';
import fs from 'fs';

export const input = fs
	.readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
	.toString()
	.trim();

export const sampleInput = fs
	.readFileSync(path.join(import.meta.dirname, 'sample-input.txt'), 'utf8')
	.toString()
	.trim();
