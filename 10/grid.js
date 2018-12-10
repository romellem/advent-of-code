// @example
// position=<-32494,  54541> velocity=< 3, -5>
const INPUT_REGEX = /^position=<\s*(-?\d+),\s*(-?\d+)>\s*velocity=<\s*(-?\d+),\s*(-?\d+)>$/;

class Point {
    constructor(line) {
        let [match, x, y, vx, vy] = INPUT_REGEX.exec(line);
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.vx = parseInt(vx);
        this.vy = parseInt(vy);

        if (
            Number.isNaN(this.x) ||
            Number.isNaN(this.y) ||
            Number.isNaN(this.vx) ||
            Number.isNaN(this.vy)
        ) {
            console.log('Error in parsing ', line);
            process.exit(1);
        }
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    translate(x, y) {
        this.x += x;
        this.y += y;
    }
}

class Grid {
    constructor(lines) {
        this.points = lines.map(line => new Point(line));

        // Normalize our points around 0, 0
        this.normalize();
    }

    normalize() {
        let xs = this.points.map(p => p.x);
        xs.sort((a, b) => a - b);
        let ys = this.points.map(p => p.y);
        ys.sort((a, b) => a - b);

        let min_x = xs[0];
        let max_x = xs[xs.length - 1];

        let min_y = ys[0];
        let max_y = ys[ys.length - 1];

        let translate_x = -1 * min_x;
        let translate_y = -1 * min_y;

        this.points.forEach(p => p.translate(translate_x, translate_y));
    }

    countGroups() {
        
    }

    tick(i) {
        // let xs_lookup = {};
        let ys_lookup = {};
        for (let i = 0; i < this.points.length; i++) {
            let point = this.points[i];
            point.move();
            // xs_lookup[point.x] = true;
            ys_lookup[point.y] = true;
        }

        // let xs = Object.keys(xs_lookup);
        let ys = Object.keys(ys_lookup).map(n => +n);
        ys.sort((a, b) => a - b);

        let in_a_row = 0;
        for (let i = 0; i < ys.length - 1; i++) {
            let a = ys[i]
            let b = ys[i + 1];
            if (a + 1 === b) {
                in_a_row++;
            } else {
                in_a_row = 0;
            }

            if (in_a_row > 8) {
                let ps = this.points.map(p => [p.x, p.y]);
                ps.sort((a, b) => {
                    if (a[0] < b[0]) return -1;
                    else if (a[0] > b[0]) return 1;
                    else return 0;
                })
                console.log(ps.map(p => `${p[0]},${p[1]}`).join('\n'));
                console.log('-------')
                console.log(i)
                process.exit(1)
            }
        }
    }
}

module.exports = Grid;


