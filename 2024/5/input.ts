import path from 'path';
import fs from 'fs';

const [rawOrderingRules, rawPages] = fs
	.readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n');

export const orderingRules = rawOrderingRules.split('\n').map((rule: string) => {
	return rule.split('|').map((v) => parseInt(v, 10)) as [number, number];
});

export const pages = rawPages
	.split('\n')
	.map((line: string) => line.split(',').map((v) => parseInt(v, 10)));
