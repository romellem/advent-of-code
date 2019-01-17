// Copied from 2018 - Day 9 code!
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

module.exports = Marble;
