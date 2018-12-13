const Garden = require('./garden');
const input = require('./input');

const { initialState, spreadRules } = input;

let garden = new Garden(initialState, spreadRules);

const DAYS_TO_SIMULATE = 20;
garden.tick(DAYS_TO_SIMULATE);

console.log(garden.getSumOfAlivePlantsIds());
