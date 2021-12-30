import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const raw_input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim();

export const input = raw_input.split('\n').map((command) => {
	let [op, a, b] = command.split(' ');
	if (/\d+/.test(a)) {
		a = parseInt(a, 10);
	}
	if (/\d+/.test(b)) {
		b = parseInt(b, 10);
	}
	const args = [a, b].filter((v) => v !== undefined);

	return { op, args };
});
