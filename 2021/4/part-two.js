const { input } = require('./input');
const { Bingo } = require('./bingo.js');
const { cyan } = require('colors/safe');


let game = new Bingo(input.numbers, input.boards);

let winning_boards;
let boards_remaining = input.boards.length;

while (boards_remaining > 0) {
	winning_boards = game.pickNext();
	if (winning_boards) {
		boards_remaining -= winning_boards.length
	}
}

let [winning_board, ...rest] = winning_boards;

if (rest.length > 0) {
	throw new Error('More than one board won last!');
}

console.log('Called:\n' + game.called.map(num => winning_board.has(num) ? cyan(num) : num).join(' ') + '\n');
console.log('Board Num:', winning_board.id)
winning_board.print(game.called);
console.log('-----')
console.log(game.partOne(winning_board));
