const { input } = require("./input");
const Computer = require("./computer");

const computer = new Computer(input);

console.log(computer.partTwo());
