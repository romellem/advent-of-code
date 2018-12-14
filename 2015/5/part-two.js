const input = require('./input');
const { NaughtyStringNewRules } = require('./naughty-string');

let nice_string_count = input
    .map(s => new NaughtyStringNewRules(s))
    .filter(s => !s.isNaughty)
    .length;

console.log(nice_string_count);
