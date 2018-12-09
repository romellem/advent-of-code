const fs = require('fs');
const path = require('path');
const Game = require('./game');

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
const parsing_regex = /^(\d+) players; last marble is worth (\d+) points/;
let [match, players, highest_scoring_marble] = parsing_regex.exec(raw_input);

// Variable input is different, just pass in two variables as separate args
if (process.argv[2] && process.argv[3]) {
    players = process.argv[2];
    highest_scoring_marble = process.argv[3];
}

players = parseInt(players);
highest_scoring_marble = parseInt(highest_scoring_marble) * 100;

let game = new Game(players, highest_scoring_marble);
let winner = game.getWinner();

console.log(
    `Winning score with ${players} and ${highest_scoring_marble} largest marble is: ${winner.score}`
);
