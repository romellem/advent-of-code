/**
 * You can determine whether a given `x,y` coordinate will be a wall or an open space using a simple system:
 *
 * - Find `x*x + 3*x + 2*x*y + y + y*y`.
 * - Add the office designer's favorite number (your puzzle input).
 * - Find the **binary representation** of that sum; count the _number_ of **bits** that are `1`.
 *     - If the number of bits that are `1` is _even_, it's an _open space_.
 *     - If the number of bits that are `1` is _odd_, it's a _wall_.
 */
const genMazeFromNumber = (num, size) => {
    // Initialize grid to be all open spaces (zeroes)
    let grid = Array(size)
        .fill()
        .map(row => Array(size).fill(0));

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            // prettier-ignore
            let coord = (x * x) + (3 * x) + (2 * x * y) + (y) + (y * y);

            coord += num;
            let binary = coord
                .toString(2)
                .split('')
                .map(n => +n);
            let one_bits = binary.reduce((a, b) => a + b, 0);

            if (one_bits % 2 === 1) {
                // If the number of bits that are `1` is _odd_, it's a _wall_
                grid[y][x] = 1;
            }
        }
    }

    return grid;
};

const getMazeAsString = (maze, path) => {
    if (path) path.forEach(([x, y]) => (maze[y][x] = 'O'));

    let x_axis = maze[0].slice(0);
    x_axis = x_axis.map((c, i) => i % 10).join('');

    let rows = maze.map(row => row.map(c => (c === 'O' ? 'O' : (c ? '#' : '.'))).join(''));
    let padded_rows = rows.map((c, i) => (i % 10) + ' ' + c);

    return '  ' + x_axis + '\n' + padded_rows.join('\n');
};

module.exports = { genMazeFromNumber, getMazeAsString };
