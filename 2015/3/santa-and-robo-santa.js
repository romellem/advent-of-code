class SantaAndRoboSanta {
    constructor(directions) {
        this.directions = directions;

        this.sx = 0;
        this.sy = 0;

        this.rx = 0;
        this.ry = 0;

        this.visited = {};
    }

    travel() {
        this.visited[`${this.sx},${this.sy}`] = 1;

        this.directions.forEach((direction, i) => {
            this.move(i % 2 === 0, direction);

            this.visited[`${this.sx},${this.sy}`] = 1;
            this.visited[`${this.rx},${this.ry}`] = 1;
        });
    }

    move(santa, direction) {
        if (santa) {
            if (direction === '^') {
                this.sy--;
            } else if (direction === 'v') {
                this.sy++;
            } else if (direction === '>') {
                this.sx++;
            } else {
                this.sx--;
            }
        } else {
            if (direction === '^') {
                this.ry--;
            } else if (direction === 'v') {
                this.ry++;
            } else if (direction === '>') {
                this.rx++;
            } else {
                this.rx--;
            }
        }
        
    }

    getTotalHousesVisted() {
        return Object.values(this.visited).reduce((a, b) => a + b, 0);
    }
}

module.exports = SantaAndRoboSanta;
