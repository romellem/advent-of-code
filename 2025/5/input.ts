import path from 'path';
import fs from 'fs';

function parse(filename: string) {
	const [rangesStr, ingredientsStr] = fs
		.readFileSync(path.join(import.meta.dirname, filename), 'utf8')
		.toString()
		.trim()
		.split('\n\n')
		.map((str) => str.trim());

	const ranges = rangesStr.split('\n').map((line) => {
		const [low, high] = line.split('-').map((v) => parseInt(v, 10));
		return { low, high };
	});
	const ingredients = ingredientsStr.split('\n').map((num) => parseInt(num, 10));

	return { ranges, ingredients };
}

export const input = parse('input.txt');
export const sampleInput = parse('sample-input.txt');
