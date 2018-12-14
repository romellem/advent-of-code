class Santa {
    constructor(directions) {
        this.directions = directions;

        this.x = 0;
        this.y = 0;

        this.visited = {};
    }

    travel() {
        this.visited[`${this.x},${this.y}`] = 1;

        this.directions.forEach(direction => {
            this.move(direction);
            this.visited[`${this.x},${this.y}`] = 1;
        });
    }

    move(direction) {
        if (direction === '^') {
            this.y--;
        } else if (direction === 'v') {
            this.y++;
        } else if (direction === '>') {
            this.x++;
        } else {
            this.x--;
        }
    }

    getTotalHousesVisted() {
        return Object.values(this.visited).reduce((a, b) => a + b, 0);
    }
}

module.exports = Santa;
