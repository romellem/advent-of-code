import { input } from './input';

type DoCommand = {
	index: number;
	type: 'do';
};
type DontCommand = {
	index: number;
	type: 'dont';
};
type MulCommand = {
	index: number;
	type: 'mul';
	product: number;
};
type Commands = DoCommand | DontCommand | MulCommand;

const commands: Array<Commands> = [];
let match: RegExpExecArray | null;

const doRegEx = /do\(\)/g;
while ((match = doRegEx.exec(input)) !== null) {
	commands.push({ index: match.index, type: 'do' });
}

const dontRegEx = /don't\(\)/g;
while ((match = dontRegEx.exec(input)) !== null) {
	commands.push({ index: match.index, type: 'dont' });
}

const mulRegExp = /mul\((\d{1,3}),(\d{1,3})\)/g;
while ((match = mulRegExp.exec(input)) !== null) {
	const [, numA, numB] = match;

	commands.push({
		index: match.index,
		type: 'mul',
		product: parseInt(numA, 10) * parseInt(numB, 10),
	});
}

commands.sort((a, b) => a.index - b.index);

let running = true;
let sum = 0;
for (let command of commands) {
	if (command.type === 'do') {
		running = true;
	} else if (command.type === 'dont') {
		running = false;
	} else if (command.type === 'mul' && running) {
		sum += command.product;
	}
}

console.log(sum);
