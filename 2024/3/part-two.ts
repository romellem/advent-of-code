import { input } from './input';

let match: RegExpExecArray | null;

const commands: Array<
	| {
			index: number;
			type: 'do';
	  }
	| {
			index: number;
			type: 'dont';
	  }
	| {
			index: number;
			type: 'mul';
			product: number;
	  }
> = [];
const doRegEx = /do\(\)/g;
while ((match = doRegEx.exec(input)) !== null) {
	commands.push({ index: match.index, type: 'do' });
}

const dontRegEx = /don't\(\)/g;
while ((match = dontRegEx.exec(input)) !== null) {
	commands.push({ index: match.index, type: 'dont' });
}

const mulRegExp = /mul\(\d{1,3},\d{1,3}\)/g;
while ((match = mulRegExp.exec(input)) !== null) {
	const [mulCommand] = match;
	const [, numA, numB] = /mul\((\d{1,3}),(\d{1,3})\)/.exec(mulCommand) || [];

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
