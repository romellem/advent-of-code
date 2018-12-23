const distance = require('manhattan');
const input = require('./input');
const cloned_input = JSON.parse(JSON.stringify(input));

xs = cloned_input.map(p => p[0]);
ys = cloned_input.map(p => p[1]);
zs = cloned_input.map(p => p[2]);

const sortNum = (a, b) => {
    if (a < b) return -1;
    else if (a > b) return 1;
    else return 0;
};

xs.sort(sortNum);
ys.sort(sortNum);
zs.sort(sortNum);

const min_x = xs[0];
const max_x = xs[xs.length - 1];

const min_y = ys[0];
const max_y = ys[ys.length - 1];

const min_z = zs[0];
const max_z = zs[zs.length - 1]; 

let largest = cloned_input[cloned_input.length - 1];

let in_range = 0;
for (let i = 0; i < input.length - 1; i++) {
    let bot = input[i];
    if (distance(bot.pos, largest.pos) <= largest.r) {
        in_range++;
    }
}

console.log(in_range);
