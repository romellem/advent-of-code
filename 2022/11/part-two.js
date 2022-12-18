const { input } = require('./input');
const { KeepAway, Monkey } = require('./monkey');

let monkeys = input.map((config) => new Monkey(config));
let game = new KeepAway(monkeys, false);

for (let i = 0; i < 10000; i++) {
	game.playRound();
}

let [monkey1, monkey2] = game.getSortedMonkeys();

console.log(monkey1.inspection_count * monkey2.inspection_count);
