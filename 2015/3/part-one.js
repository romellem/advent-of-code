const input = require('./input');
const Santa = require('./santa');

let directions = input.split('');

let santa = new Santa(directions);

santa.travel();

console.log(`Santa brought presents to ${santa.getTotalHousesVisted()} houses`);
