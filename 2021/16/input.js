import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const readFileAsStringAndTrim = (relative_file) =>
	fs.readFileSync(path.join(__dirname, relative_file), 'utf8').toString().trim();

export const input = readFileAsStringAndTrim('input.txt');

export const sampleInputPartOne = new Map([
	// Map of sample inputs and their version sum
	['8A004A801A8002F478', 16],
	['620080001611562C8802118E34', 12],
	['C0015000016115A2E0802F182340', 23],
	['A0016C880162017C3686B18A3D4780', 31],
]);
