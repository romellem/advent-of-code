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

const hasVisited = c => {
    let point = c.join(',');
    if (visited[point]) {
        return true;
    } else {
        visited[point] = true;
        return false;
    }
};
let coords = [0, 0];
let visited = { '0,0': true };

let move = {
    N: v => {
        for (let i = 0; i < v; i++) {
            coords[1]--;
            if (hasVisited(coords)) {
                return true;
            }
        }

        return false;
    },
    E: v => {
        for (let i = 0; i < v; i++) {
            coords[0]++;
            if (hasVisited(coords)) {
                return true;
            }
        }

        return false;
    },
    S: v => {
        for (let i = 0; i < v; i++) {
            coords[1]++;
            if (hasVisited(coords)) {
                return true;
            }
        }

        return false;
    },
    W: v => {
        for (let i = 0; i < v; i++) {
            coords[0]--;
            if (hasVisited(coords)) {
                return true;
            }
        }

        return false;
    },
};

for (let i = 0; i < input.length; i++) {
    let action = input[i];
    let { turn, walk } = action;
    rotate(turn);

    let facing = directions[current_direction];
    if (move[facing](walk)) {
        break;
    }
}

console.log(manhattan([0, 0], coords));
