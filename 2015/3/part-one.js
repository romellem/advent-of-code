const directions = require('./input');
const Santa = require('./santa');

let santa = new Santa(directions);

santa.travel();

console.log(`Santa brought presents to ${santa.getTotalHousesVisted()} houses`);
