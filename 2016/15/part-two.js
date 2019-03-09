const { partTwoInput } = require('./input');
const Disks = require('./disks');

let disk = new Disks(partTwoInput);
let time = disk.getFirstTimeWhenCapsuleWouldFallThrough();
console.log(time);
