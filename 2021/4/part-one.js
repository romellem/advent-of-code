const { input } = require('./input');
const { Bingo } = require('./bingo.js');
const { cyan } = require('colors/safe');


let game = new Bingo(input.numbers, input.boards);

let winning_board;

while (!winning_board) {
	winning_board = game.pickNext();
}

console.log(game.called.map(num => winning_board.has(num) ? cyan(num) : num).join(' '));
winning_board.print(game.called);
console.log('-----')
console.log(game.partOne(winning_board));
