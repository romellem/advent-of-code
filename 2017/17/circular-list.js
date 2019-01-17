class CirclularListItem {
    constructor(value, is_first = false) {
        this.value = value;

        // Pointers to other CirclularListItems
        this.next;
        this.prev;

        // Set next and prev to itself
        if (is_first) {
            this.next = this;
            this.prev = this;
        }
    }

    next(n = 1) {
        let current = this;
        do {
            current = current.next;
        } while (--n);
        return current;
    }

    prev(n = 1) {
        let current = this;
        do {
            current = current.prev;
        } while (--n);
        return current;
    }

    insertNext(item) {
        this.next.prev = item;
        item.next = this.next;

        this.next = item;
        item.prev = this;

        return item;
    }

    insertPrev(item) {
        this.prev.next = item;
        item.next = this;

        item.prev = this.prev;
        this.prev = item;

        return item;
    }

    removeSelf() {
        this.next.prev = this.prev;
        this.prev.next = this.next;

        return this;
    }
}

class CirclularList {
    constructor(value) {
        this.head = undefined;
        if (typeof value !== 'undefined') {
            this.init(value);
        }
    }

    init(value) {
        this.head = new CirclularListItem(value, true);

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
        this.head = this.head.insertNext(item);

        return this;
    }

    insertPrev(item) {
        this.head = this.head.insertPrev(item);

        return this;
    }

    popHeadMoveNext() {
        let next = this.head.next;
        let old_head = this.head.removeSelf();
        this.head = next;

        return old_head;
    }

    popHeadMovePrev() {
        let prev = this.head.prev;
        let old_head = this.head.removeSelf();
        this.head = prev;

        return old_head;
    }
}

module.exports = CirclularList;
