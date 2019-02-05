const { input } = require('./input');
const Screen = require('./screen');

let screen = new Screen(input);
screen.run();

screen.printScreen();
