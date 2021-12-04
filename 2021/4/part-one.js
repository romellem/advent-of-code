const { input } = require('./input');
const { Bingo } = require('./bingo.js');
const { cyan } = require('colors/safe');


let game = new Bingo(input.numbers, input.boards);

let winning_boards;

while (!winning_boards) {
	winning_boards = game.pickNext();
}

let [winning_board, ...rest] = winning_boards;

if (rest.length > 0) {
	throw new Error('More than one board won first!');
}

console.log('Called:\n' + game.called.map(num => winning_board.has(num) ? cyan(num) : num).join(' ') + '\n');
console.log('Board Num:', winning_board.id)
winning_board.print(game.called);
console.log('-----')
console.log(winning_board.getScore(game.called));
