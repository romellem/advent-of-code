const input = require('./input');
const { NaughtyStringOldRules } = require('./naughty-string');

let nice_string_count = input
    .map(s => new NaughtyStringOldRules(s))
    .filter(s => !s.isNaughty)
    .length;

console.log(nice_string_count);
