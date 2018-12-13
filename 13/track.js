let cart_id = 0;

// left the first time, goes straight the second time, turns right the third time
const CART_TURNS = ['L', 'S', 'R'];

const TURNS = ['/', '\\', '+'];

class Cart {
    constructor(x, y, direction, track, id) {
        this.id = typeof id === 'undefined' ? ++cart_id : id;

        this.x = x;
        this.y = y;

        // N E S W
        this.direction = direction;

        this.track = track;

        // Number of times we've turned
        this.turns = 0;
    }

    setDirectionAfterTurn(turn) {
        if (this.direction === 'N') {
            if (turn === 'L') {
                this.direction = 'W';
            } else if (turn === 'R') {
                this.direction = 'E';
            }
        } else if (this.direction === 'E') {
            if (turn === 'L') {
                this.direction = 'N';
            } else if (turn === 'R') {
                this.direction = 'S';
            }
        } else if (this.direction === 'S') {
            if (turn === 'L') {
                this.direction = 'E';
            } else if (turn === 'R') {
                this.direction = 'W';
            }
        } else {
            // W
            if (turn === 'L') {
                this.direction = 'S';
            } else if (turn === 'R') {
                this.direction = 'N';
            }
        }
    }

    move() {
        let next_coord = [this.x, this.y];
        switch (this.direction) {
            case 'N':
                next_coord[1]--;
                break;
            case 'E':
                next_coord[0]++;
                break;
            case 'S':
                next_coord[1]++;
                break;
            case 'W':
                next_coord[0]--;
                break;
        }

        let next_track;
        try {

            next_track = this.track[next_coord[1]][next_coord[0]];
        } catch (e) {
            debugger;
        }

        if (TURNS.includes(next_track)) {
            if (next_track === '+') {
                let turn = CART_TURNS[(this.turns++) % CART_TURNS.length];
                this.setDirectionAfterTurn(turn);
            } else if (next_track === '/') {
                switch (this.direction) {
                    case 'N':
                        this.direction = 'E';
                        break;
                    case 'E':
                        this.direction = 'N';
                        break;
                    case 'S':
                        this.direction = 'W';
                        break;
                    case 'W':
                        this.direction = 'S';
                        break;
                }
            } else if (next_track === '\\') {
                switch (this.direction) {
                    case 'N':
                        this.direction = 'W';
                        break;
                    case 'E':
                        this.direction = 'S';
                        break;
                    case 'S':
                        this.direction = 'E';
                        break;
                    case 'W':
                        this.direction = 'N';
                        break;
                }
            }
        }

        // Move forward to next coord
        this.x = next_coord[0];
        this.y = next_coord[1];
    }

    getIcon() {
        switch (this.direction) {
            case 'N':
                return '^';
            case 'E':
                return '>';
            case 'S':
                return 'v';
            case 'W':
                return '<';
        }
    }
}

const CART_DIRECTION_LOOKUP = {
    v: 'S',
    '^': 'N',
    '<': 'W',
    '>': 'E',
};
const CART_SHAPES = Object.keys(CART_DIRECTION_LOOKUP);

class Track {
    constructor(track) {
        // First, remove all carts symbols and replace with equivalent track
        this.track = this.parseTrack(track);

        this.carts = [];

        // Next, parse out our carts and add them to our array
        track.forEach((row, y) => {
            for (let x = 0; x < row.length; x++) {
                let cell = row[x];
                if (CART_SHAPES.includes(cell)) {
                    this.carts.push(new Cart(x, y, CART_DIRECTION_LOOKUP[cell], this.track));
                }
            }
        });
    }

    parseTrack(track) {
        return track.map(row => {
            return row.replace(/[\<\>]/g, '-').replace(/[\^v]/g, '|');
        });
    }

    // Assume a collision happens after a full tick
    getCollisionCoords() {
        let cart_coord_lookups = {};
        this.carts.forEach(cart => {
            let x = cart.x;
            let y = cart.y;
            let coord = `${x},${y}`;

            if (!cart_coord_lookups[coord]) {
                cart_coord_lookups[coord] = [cart];
            } else {
                cart_coord_lookups[coord].push(cart);
            }
        });

        let collision_coords = Object.entries(cart_coord_lookups).filter(c => c[1].length > 1);
        if (collision_coords.length) {
            return collision_coords;
        } else {
            return null;
        }
    }

    tick() {
        this.carts.forEach(cart => cart.move());
    }

    getStateString() {
        let populated_track = this.track.slice(0);
        this.carts.forEach(cart => {
            let icon = cart.getIcon();
            
            let new_row = populated_track[cart.y].split('');
            new_row[cart.x] = icon;
            populated_track[cart.y] = new_row.join('');
        });

        return populated_track.join('\n');
    }
}

module.exports = Track;
