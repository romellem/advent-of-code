const { input } = require('./input');
const { DiGraph } = require('./graph');

// const input = [1,2,3,4];
// const input = `28
// 33
// 18
// 42
// 31
// 14
// 46
// 20
// 48
// 47
// 24
// 23
// 49
// 45
// 19
// 38
// 39
// 11
// 1
// 32
// 25
// 35
// 8
// 17
// 7
// 9
// 4
// 2
// 34
// 10
// 3`.split('\n').map(v => +v).sort((a, b) => a - b)
let g = new DiGraph(input.slice(0).sort((a, b) => a - b));
let total = g.countPaths();
console.log('\n\n============\n');
console.log(total);