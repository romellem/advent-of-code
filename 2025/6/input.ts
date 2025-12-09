import path from 'path';
import fs from 'fs';

export type Multiply = '*';
export type Add = '+';

export type Operations = Add | Multiply;

function parse(filename: string) {
	/**
	 * Don't trim the file, we may have important leading space in the first row.
	 * (Technically _I_ don't in my input, and my guess in Eric designed this to not
	 * have that edge case for some, but just in case, make the solution robust for
	 * that possibility).
	 */
	const textBlock = fs.readFileSync(path.join(import.meta.dirname, filename), 'utf8').toString();

	// Parse out 2d array of data first
	const rows: Array<Array<Operations | number>> = textBlock
		.split('\n')
		.filter((v) => {
			// Filter out empty rows because we aren't trimming our input
			return v;
		})
		.map((row) => {
			return row
				.trim()
				.split(/\s+/)
				.map((chars) => {
					const isDigit = /\d+/.test(chars);
					if (isDigit) {
						return parseInt(chars, 10);
					}

					// Otherwise its the math operation (`+`, `*`)
					return chars as Operations;
				});
		});

	const cols: Array<Array<Operations | number>> = [];
	// But then walk columns within our outer rows first
	for (let x = 0; x < rows[0].length; x++) {
		const col: Array<Operations | number> = [];

		/**
		 * And then loop rows within the columns to transform our
		 * list of rows into a list of columns (ending with the math operation)
		 */
		for (let y = 0; y < rows.length; y++) {
			col.push(rows[y][x]);
		}

		cols.push(col);
	}

	const problems = cols.map((_col) => {
		// Don't mutate original col
		const col = [..._col];

		// Last item in column is the operation
		const operation = col.pop() as Operations;
		const digits = col as number[];

		return {
			digits,
			operation,
		};
	});

	return { rows, cols, problems, textBlock };
}

export const input = parse('input.txt');
export const sampleInput = parse('sample-input.txt');
