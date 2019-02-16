const Disk = require('./disk');
const { partTwoInput } = require('./input');

let disk = new Disk(partTwoInput);
console.log(disk.checksum());
