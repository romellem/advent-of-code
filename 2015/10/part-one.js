const input = require('./input');
const lookAndSay = require('./look-and-say');

let said = input.toString();
for (let i = 0; i < 40; i++) {
    console.log(i + ' : ' + said.length.toLocaleString())
    said = lookAndSay(said);
}

console.log('============');
console.log(said.length);
