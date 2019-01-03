class Grid {
    constructor() {
        this.grid = { '0,0': 1 };
        this.reverseGrid = { 2: '0,0' };
        this.current = '0,0';
        this.step = 1;
    }

    getNeighbors(x, y) {
        let neighbors = [];
        let neighbor_coords = [
            `${x + 1},${y}`,
            `${x + 1},${y - 1}`,
            `${x},${y - 1}`,
            `${x - 1},${y - 1}`,
            `${x - 1},${y}`,
            `${x - 1},${y + 1}`,
            `${x},${y + 1}`,
            `${x + 1},${y + 1}`,
        ];
        neighbor_coords.forEach(c => {
            if (this.grid[c]) {
                neighbors.push(this.grid[c]);
            }
        });

        return neighbors;
    }

    getNeighborsSum(x, y) {
        return this.getNeighbors(x, y).reduce((a, b) => a + b, 0);
    }

    fillSummedSpiral(distance) {
        let x = 0,
            y = 0;
        
        let num = 1;

        while (distance > 0) {
            // Starting at '0,0', move `step` right and up, and `step + 1` left and down
            for (let right = 0; right < this.step; right++) {
                --distance;
                

                x++;
                let neighbors_sum = this.getNeighborsSum(x, y);
                let next = `${x},${y}`;
                this.grid[next] = neighbors_sum;
                this.reverseGrid[neighbors_sum] = next;
                this.current = next;
            }

            for (let up = 0; up < this.step; up++) {
                --distance;

                y--;
                let next = `${x},${y}`;
                let neighbors_sum = this.getNeighborsSum(x, y);
                this.grid[next] = neighbors_sum;
                this.reverseGrid[neighbors_sum] = next;
                this.current = next;
            }

            for (let left = 0; left < this.step + 1; left++) {
                --distance;

                x--;
                let next = `${x},${y}`;
                let neighbors_sum = this.getNeighborsSum(x, y);
                this.grid[next] = neighbors_sum;
                this.reverseGrid[neighbors_sum] = next;
                this.current = next;
            }

            for (let down = 0; down < this.step + 1; down++) {
                --distance;

                y++;
                let neighbors_sum = this.getNeighborsSum(x, y);
                let next = `${x},${y}`;
                this.grid[next] = neighbors_sum;
                this.reverseGrid[neighbors_sum] = next;
                this.current = next;
            }

            this.step += 2;
        }
    }

    fillSpiral(distance) {
        let x = 0,
            y = 0;
        
        let num = 1;

        while (distance > 0) {
            // Starting at '0,0', move `step` right and up, and `step + 1` left and down
            for (let right = 0; right < this.step; right++) {
                --distance;

                x++;
                let next = `${x},${y}`;
                this.grid[next] = ++num;
                this.reverseGrid[num] = next;
                this.current = next;
            }

            for (let up = 0; up < this.step; up++) {
                --distance;

                y--;
                let next = `${x},${y}`;
                this.grid[next] = ++num;
                this.reverseGrid[num] = next;
                this.current = next;
            }

            for (let left = 0; left < this.step + 1; left++) {
                --distance;

                x--;
                let next = `${x},${y}`;
                this.grid[next] = ++num;
                this.reverseGrid[num] = next;
                this.current = next;
            }

            for (let down = 0; down < this.step + 1; down++) {
                --distance;

                y++;
                let next = `${x},${y}`;
                this.grid[next] = ++num;
                this.reverseGrid[num] = next;
                this.current = next;
            }

            this.step += 2;
        }
    }
}

module.exports = Grid;
