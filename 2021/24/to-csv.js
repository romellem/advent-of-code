import { input } from './input.js';

let current_func = [];
let program = [];
for (let line of input) {
	if (current_func.length && line.startsWith('inp')) {
		program.push([...current_func]);
		current_func = [];
	}

	current_func.push(line);
}

program.push([...current_func]);

let max_func = program.reduce((max, func) => Math.max(max, func.length), 0);

let str = '| ' + program.map((_, i) => `Program ${i}`).join(' | ') + ' |';
str += '\n| ' + program.map((_, i) => `-----`).join(' | ') + ' |';
for (let i = 0; i < max_func; i++) {
	let row = [];

	let cmds_across = new Set();
	for (let func of program) {
		let cmd = func[i] || '';
		row.push(cmd);
		cmds_across.add(cmd);
	}
	if (cmds_across.size === 1) {
		row = '| **' + row.join('** | **') + '** |';
	} else {
		row = '| ' + row.join(' | ') + ' |';
	}

	str += str ? '\n' + row : row;
}
console.log(str);
