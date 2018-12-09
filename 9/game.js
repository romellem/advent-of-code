class Marble {
    constructor(value, is_first_marble = false) {
        this.value = value;

        // Clockwise
        this.next_marble;

        // Counter clockwise
        this.prev_marble;

        // Set next and prev to itself
        if (is_first_marble) {
            this.next_marble = this;
            this.prev_marble = this;
        }
    }

    next(n = 1) {
        let marble = this;
        do {
            marble = marble.next_marble;
        } while (--n);
        return marble;
    }

    prev(n = 1) {
        let marble = this;
        do {
            marble = marble.prev_marble;
        } while (--n);
        return marble;
    }

    // Insert Counter Clockwise
    insertNext(marble) {
        this.next_marble.prev_marble = marble;
        marble.next_marble = this.next_marble;

        this.next_marble = marble;
        marble.prev_marble = this;

        return marble;
    }

    // Insert Counter Clockwise
    insertPrev(marble) {
        this.prev_marble.next_marble = marble;
        marble.next_marble = this;

        this.prev_marble = marble;
        marble.prev_marble = this.prev_marble;

        return marble;
    }

    removeSelf() {
        this.next_marble.prev_marble = this.prev_marble;
        this.prev_marble.next_marble = this.next_marble;
    }
}

class Player {
    constructor(id) {
        this.id = id;
        this.marbles = [];
        this.score = 0;
    }

    addMarble(marble) {
        this.marbles.push(marble);
        this.score += marble.value;
    }

    // Just in case
    refreshScore() {
        let accumulator = 0;
        for (let i = 0; i < this.marbles.length; i++) {
            accumulator += this.marbles[i].value;
        }
        this.score = accumulator;
        return this.score;
    }
}

class PlayersList {
    constructor(players) {
        this.players = players;

        // When running `.next()` the first time, `current_player` will move up to player 0
        this.current_player = -1;
    }

    next() {
        this.current_player = (this.current_player + 1) % this.players.length;

        return this.players[this.current_player];
    }

    getHighestScoring() {
        let list = this.players.slice(0);
        list.sort((a, b) => {
            if (a.score < b.score) return -1;
            else if (a.score > b.score) return 1;
            else return 0;
        });

        return list.pop();
    }
}

class Game {
    constructor(players, highest_scoring_marble) {
        this.players = new PlayersList(
            Array(players)
                .fill()
                .map((p, i) => new Player(i + 1))
        );

        // Set first marble and having its next and prev marbles equal to itself
        this.current_marble = new Marble(0, true);

        this.fillCircle(highest_scoring_marble);
    }

    fillCircle(highest_scoring_marble) {
        for (let v = 1; v <= highest_scoring_marble; v++) {
            let player = this.players.next();
            let marble = new Marble(v);
            if (v % 23 === 0) {
                // Add current marble to player's score
                player.addMarble(marble);

                // Move back 7 marbles, add that to players score as well
                let marble_to_be_removed = this.current_marble.prev(7);
                player.addMarble(marble_to_be_removed);

                // Set current marble, and remove marble that was back 7 spots
                this.current_marble = marble_to_be_removed.next();
                marble_to_be_removed.removeSelf();
            } else {
                this.current_marble = this.current_marble.next().insertNext(marble);
            }
        }
    }

    getWinner() {
        return this.players.getHighestScoring();
    }
}

module.exports = Game;
