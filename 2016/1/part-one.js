const manhattan = require('manhattan');
const input = require('./input');
let directions = ['N', 'E', 'S', 'W'];

// North
let current_direction = 0;
const rotate = l_or_r => {
    if (l_or_r === 'R') {
        current_direction = (current_direction + 1) % directions.length;
    } else {
        // Turning left is like turning right 3 times.
        // Makes it easier than I always increase and don't have to worry about the negative case
        current_direction = (current_direction + 3) % directions.length;
    }
};

let coords = [0, 0];
let move = {
    N: v => (coords[1] -= v),
    E: v => (coords[0] += v),
    S: v => (coords[1] += v),
    W: v => (coords[0] -= v),
};

input.forEach(action => {
    let { turn, walk } = action;
    rotate(turn);

    let facing = directions[current_direction];
    move[facing](walk);
});

console.log(manhattan([0, 0], coords));
