const { input } = require('./input');
const { Grid } = require('./grid');

let c = new Grid(input);
// let c = new Grid(`L.LL.LL.LL
// LLLLLLL.LL
// L.L.L..L..
// LLLL.LL.LL
// L.LL.LL.LL
// L.LLLLL.LL
// ..L.L.....
// LLLLLLLLLL
// L.LLLLLL.L
// L.LLLLL.LL`.split('\n').map(v=>v.split('')));
console.log(c.tick2() );
