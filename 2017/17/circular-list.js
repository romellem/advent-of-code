class CirclularListItem {
    constructor(value, is_first = false) {
        this.value = value;

        // Pointers to other CirclularListItems
        this.next_item;
        this.prev_item;

        // Set next and prev to itself
        if (is_first) {
            this.next_item = this;
            this.prev = this;
        }
    }

    next(n = 1) {
        let current = this;
        do {
            current = current.next_item;
        } while (--n);
        return current;
    }

    prev(n = 1) {
        let current = this;
        do {
            current = current.prev_item;
        } while (--n);
        return current;
    }

    insertNext(item) {
        this.next_item.prev_item = item;
        item.next_item = this.next_item;

        this.next_item = item;
        item.prev_item = this;

        return item;
    }

    insertPrev(item) {
        this.prev_item.next_item = item;
        item.next_item = this;

        item.prev_item = this.prev_item;
        this.prev_item = item;

        return item;
    }

    removeSelf() {
        this.next_item.prev_item = this.prev_item;
        this.prev_item.next_item = this.next_item;

        return this;
    }
}

class CirclularList {
    constructor(value) {
        // Keep head unset if we didn't pass in a value
        this.head = undefined;
        if (typeof value !== 'undefined') {
            // This sets `this.head`
            this.init(value);
        }
    }

    init(value) {
        if (!(value instanceof CirclularListItem)) {
            value = new CirclularListItem(value, true);
        }
        this.head = value;

        return this;
    }

    move(steps = 1) {
        // Steps can be negative to move backwards
        let direction = steps > 0 ? 'next' : 'prev';

        steps = Math.abs(steps);
        this.head = this.head[direction](steps);

        return this;
    }

    insertNext(item) {
        if (!(item instanceof CirclularListItem)) {
            item = new CirclularListItem(item);
        }
        this.head = this.head.insertNext(item);

        return this;
    }

    insertPrev(item) {
        if (!(item instanceof CirclularListItem)) {
            item = new CirclularListItem(item);
        }
        this.head = this.head.insertPrev(item);

        return this;
    }

    popHeadMoveNext() {
        let next_item = this.head.next_item;
        let old_head = this.head.removeSelf();
        this.head = next_item;

        return old_head;
    }

    popHeadMovePrev() {
        let prev_item = this.head.prev_item;
        let old_head = this.head.removeSelf();
        this.head = prev_item;

        return old_head;
    }
}

module.exports = CirclularList;
