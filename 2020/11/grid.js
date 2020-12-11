const EMPTY = 'L';
const OCCUPIED = '#';
const FLOOR = '.';

class Grid {
    constructor(initial_grid_state) {
        this.grid = JSON.parse(JSON.stringify(initial_grid_state));
       
    }

    coordIsCorner(x, y) {
        if (y === 0 || y === this.grid.length - 1) {
            return x === 0 || x === this.grid[0].length - 1;
        }

        return false;
	}
	
	getVisualNeighbors(x, y) {
		let neighbors = [];
		// up
		for (let v = y - 1; v >= 0; v--) {
			if (this.grid[v][x] === OCCUPIED) {
				neighbors.push([x, v]);
				break;
			}
		}
		// down
		for (let v = y + 1; v < this.grid.length; v++) {
			if (this.grid[v][x] === OCCUPIED) {
				neighbors.push([x, v]);
				break;
			}
		}
		// left
		for (let h = x - 1; h >= 0; h--) {
			if (this.grid[y][h] === OCCUPIED) {
				neighbors.push([h, y]);
				break;
			}
		}
		// right
		for (let h = x + 1; h < this.grid[0].length; h++) {
			if (this.grid[y][h] === OCCUPIED) {
				neighbors.push([h, y]);
				break;
			}
		}

		// ul
		for (let s = 1; s - x >= 0 && s - y >= 0; s++) {
			if (this.grid[y - s] && this.grid[y - s][x - s] === OCCUPIED) {
				neighbors.push([x - s, y - s]);
				break;
			}
		}
		// ur
		for (let s = 1; s + x < this.grid[0].length && s - y >= 0; s++) {
			if (this.grid[y - s] && this.grid[y - s][x + s] === OCCUPIED) {
				neighbors.push([x + s, y - s]);
				break;
			}
		}
		// dr
		for (let s = 1; s + x < this.grid[0].length && s + y < this.grid.length; s++) {
			if (this.grid[y + s] && this.grid[y + s][x + s] === OCCUPIED) {
				neighbors.push([x + s, y + s]);
				break;
			}
		}
		// dl
		for (let s = 1; s - x >= 0 && s + y < this.grid.length; s++) {
			if (this.grid[y + s] && this.grid[y + s][x - s] === OCCUPIED) {
				neighbors.push([x - s, y + s]);
				break;
			}
		}

		let n = neighbors.filter(([_x, _y]) => typeof (this.grid[_y] && this.grid[_y][_x]) !== 'undefined');
		return n.map(([_x, _y]) => this.grid[_y][_x]);
	}

    getNeighbors(x, y) {
        // prettier-ignore
        let neighbors = [
            [x, y - 1],     // top
            [x + 1, y - 1], // top right
            [x + 1, y],     // right
            [x + 1, y + 1], // bottom right
            [x, y + 1],     // bottom
            [x - 1, y + 1], // bottom left
            [x - 1, y],     // left
            [x - 1, y - 1], // top left
        ].filter(([_x, _y]) => typeof (this.grid[_y] && this.grid[_y][_x]) !== 'undefined');

        return neighbors.map(([_x, _y]) => this.grid[_y][_x]);
    }

    tick(steps = 1) {
		let changed;
        do {
            let new_grid_state = Array(this.grid.length)
                .fill()
				.map(() => Array(this.grid[0].length).fill());
			changed = false;

            for (let y = 0; y < this.grid.length; y++) {
                for (let x = 0; x < this.grid[0].length; x++) {
                    let cell = this.grid[y][x];

                    let neighbors = this.getNeighbors(x, y);
                    let occupied_neighbors = 0;
                    let empty_neighbords = 0;

                    neighbors.forEach(n => {
                        if (n === OCCUPIED) occupied_neighbors++;
                        else if (n === EMPTY) empty_neighbords++;
					});
					
					if (cell === FLOOR) {
						new_grid_state[y][x] = FLOOR;
					}else if (cell === EMPTY) {
						if (occupied_neighbors === 0) {
							new_grid_state[y][x] = OCCUPIED;
							changed =true
						}else 
						new_grid_state[y][x] = EMPTY;
					} else if (cell === OCCUPIED) {
						if (occupied_neighbors >= 4) {
							new_grid_state[y][x] = EMPTY;
							changed=true
						}else 
						new_grid_state[y][x] = OCCUPIED;
					} else {
						console.error('err')
					}

                    
                }
            }

            // Update our real grid
            this.grid = new_grid_state;
		} while (changed);
		
		return this.countType();
	}
	
	tick2(steps = 1) {
		let changed;
        do {
            let new_grid_state = Array(this.grid.length)
                .fill()
				.map(() => Array(this.grid[0].length).fill());
			changed = false;

            for (let y = 0; y < this.grid.length; y++) {
                for (let x = 0; x < this.grid[0].length; x++) {
                    let cell = this.grid[y][x];

                    let neighbors = this.getVisualNeighbors(x, y);
                    let occupied_neighbors = 0;
                    let empty_neighbords = 0;

                    neighbors.forEach(n => {
                        if (n === OCCUPIED) occupied_neighbors++;
                        else if (n === EMPTY) empty_neighbords++;
					});
					
					if (cell === FLOOR) {
						new_grid_state[y][x] = FLOOR;
					}else if (cell === EMPTY) {
						if (occupied_neighbors === 0) {
							new_grid_state[y][x] = OCCUPIED;
							changed =true
						}else 
						new_grid_state[y][x] = EMPTY;
					} else if (cell === OCCUPIED) {
						if (occupied_neighbors >= 5) {
							new_grid_state[y][x] = EMPTY;
							changed=true
						}else 
						new_grid_state[y][x] = OCCUPIED;
					} else {
						console.error('err')
					}

                    
                }
            }

            // Update our real grid
            this.grid = new_grid_state;
		} while (changed);
		
		return this.countType();
    }

    // Default state is ON
    countType(type = OCCUPIED) {
        let count = 0;
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[0].length; x++) {
                if (this.grid[y][x] === type) {
                    count++;
                }
            }
        }

        return count;
    }

    printGrid() {
        let grid_str = this.grid.map(row => row.map(c => (c ? ON : OFF)).join('')).join('\n');

        console.log(grid_str + '\n');
    }
}

module.exports = {Grid};
