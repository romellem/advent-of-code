const Race = require('./race');
const input = require('./input');

const RACE_TIME = 2503;
let race = new Race(input, RACE_TIME);

race.run();

console.log(race.winnerByScore.score);