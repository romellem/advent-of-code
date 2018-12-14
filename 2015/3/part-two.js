const input = require('./input');
const SantaAndRoboSanta = require('./santa-and-robo-santa');

let directions = input.split('');

let santa = new SantaAndRoboSanta(directions);

santa.travel();

console.log(
    `Santa and Robo Santa brought presents to ${santa.getTotalHousesVisted()} houses`
);
