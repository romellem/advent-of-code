const cleanSpringScript = (script) => {
	let lines = script
		.trim()
		.split('\n')
		.map((line) => {
			// Remove `#` comments
			let [, comment] = /(\s*#.+)$/.exec(line) || [];
			if (comment) {
				line = line.replace(comment, '');
			}
			let trimmed_line = line.split(/\s+/).join(' ').trim();
			return trimmed_line;
		})
		.filter((v) => v) // Remove blank lines
		.join('\n');

	// Add back trimmed ending newline
	lines += '\n';
	return lines;
};

/**
 * Given a giant string of the "last moments,"
 * @param {Object} opt
 * @param {String} opt.moments
 * @param {StrNumbering} [opt.sensor_range] - Use 4 for part one, 9 for part 2.
 * @returns {String}
 */
const annotateLastMoments = ({ moments, sensor_range }) => {
	/*
		Didn't make it across:

		.................
		.................
		@................
		#####...####.####

		.................
		.................
		.@...............
		#####...####.####
	*/
	let moment_lines = moments.split('\n');
	const A = 'A'.charCodeAt(0);
	const sensors = Array(sensor_range)
		.fill()
		.map((_, i) => String.fromCharCode(A + i));
	const sensors_str = sensors.join('');

	for (let i = 0; i < moment_lines.length; i++) {
		let line = moment_lines[i];

		// Don't annotate last block which shows dead robot (aka, when `@` and `#` are on the same line)
		if (line.includes('@') && !line.includes('#')) {
			let position = line.indexOf('@');
			let blank_space_index = -1;
			for (let j = i + 1; j < moment_lines.length; j++) {
				let next_line = moment_lines[j];
				if (!next_line.trim()) {
					blank_space_index = j;
					break;
				}
			}
			/**
			 * Editing the array in place is OK since we only insert items after our current index,
			 * thus we still iterate through all lines as the array grows
			 */

			const padded_sensors = ' '.repeat(position + 1) + sensors_str;

			// Floor is directly above next blank space
			const floor = moment_lines[blank_space_index - 1];

			// Ground (#) are true (1), hole (.) is false (0)
			const bitfloor = floor
				.split('')
				.map((v, i) =>
					// prettier-ignore
					(i < position + 1) || (i > position + sensor_range)
						? ' ' // Positions before and after range shouldn't be shown
						: (
							v === '#'
								? 1
								: 0
						  )
				)
				.join('');

			// Insert both sensors and bitfloor at the upcoming blank space
			moment_lines.splice(blank_space_index, 0, padded_sensors, bitfloor);
		}
	}

	return moment_lines.join('\n');
};

module.exports = {
	cleanSpringScript,
	annotateLastMoments,
};
