class Screen {
    constructor({ instructions, screenSize }) {
        this.instructions = JSON.parse(JSON.stringify(instructions));
        this.screen = Array(screenSize[1])
            .fill()
            .map(row => Array(screenSize[0]).fill(0));
    }

    run(debug = false) {
        if (debug) this.printScreen(0);
        this.instructions.forEach((step, i) => {
            let { type, size, row, col, by } = step;

            if (type === 'rect') {
                // Draw a rectangle in the upper left corner
                let [size_x, size_y] = size;
                for (let y = 0; y < size_y; y++)
                    for (let x = 0; x < size_x; x++) this.screen[y][x] = 1;
            } else if (type === 'shift_row') {
                // Copy row
                let row_copy = this.screen[row].slice(0);

                by %= row_copy.length;
                let new_end = row_copy.slice(0, row_copy.length - by);
                let new_start = row_copy.slice(row_copy.length - by);
                this.screen[row] = new_start.concat(new_end);
            } else if (type === 'shift_col') {
                // This one is trickier. Create a temp array that represents our row.
                // Then, shift the same way, but loop through array and set the values.
                
                let col_copy = [];
                for (let y = 0; y < this.screen.length; y++) {
                    col_copy.push(this.screen[y][col]);
                }

                by %= col_copy.length;
                let new_end = col_copy.slice(0, col_copy.length - by);
                let new_start = col_copy.slice(col_copy.length - by);
                let new_col = new_start.concat(new_end);

                for (let y = 0; y < this.screen.length; y++) {
                    this.screen[y][col] = new_col[y];
                }
            }

            if (debug) {
                this.printScreen(i + 1);
                console.log(step)
            }
        });
    }

    countLitPixels() {
        return this.screen.map(row => row.reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0);
    }

    printScreen(i) {
        let screen_str = this.screen.map(row => row.map(cell => cell ? '#' : '.').join('')).join('\n');
        if (i == null) console.log('\n\n======================')
        else console.log(`\n\n== ${i} =================`)
        console.log(screen_str);
    }
}

module.exports = Screen;
