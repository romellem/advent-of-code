const { uniqBy } = require('lodash');
const sortArrayOfNodes = (a, b) => {
    if (a.letter < b.letter) return -1;
    else if (a.letter > b.letter) return 1;
    else return 0;
};

class Node {
    constructor(letter) {
        this.letter = letter;
        this.parents = [];
        this.children = [];

        // Initialize to _not_ being added to our order.
        this.isCompleted = false;
    }

    addChild(node) {
        this.children.push(node);

        // @todo Don't sort after every insertion, sort once when everything has been added
        this.children.sort(sortArrayOfNodes);

        return this.children;
    }

    addParent(node) {
        this.parents.push(node);
        return this.parents;
    }

    get canBeCompleted() {
        // If we have no parents, we have no prerequisites, so we can be completed
        if (!this.parents.length) {
            return true;
        }

        for (let i = 0; i < this.parents.length; i++) {
            let parent = this.parents[i];
            if (!parent.isCompleted) {
                // If any parent is not complete, this node can't be completed
                return false;
            }
        }

        // If we are here, all parents are completed, this node can be completed
        return true;
    }
}

const TREE_LINE_REGEX = /^Step (\w+) must be finished before step (\w+) can begin\.$/;

class Tree {
    /**
     * @param {Array} lines Array of raw text lines "Step _ must be finished before step _ can begin."
     */
    constructor(lines) {
        this.rawLines = [...lines];
        this.tree = {};
        this.parseLines(lines);

        this.order = '';
    }

    parseLines(lines) {
        lines.forEach(line => {
            let [match, pre, post] = TREE_LINE_REGEX.exec(line);

            if (!this.tree[pre]) {
                this.tree[pre] = new Node(pre);
            }

            if (!this.tree[post]) {
                this.tree[post] = new Node(post);
            }

            // Create a doubly-linked list
            this.tree[pre].addChild(this.tree[post]);
            this.tree[post].addParent(this.tree[pre]);
        });
    }

    /**
     * @param {Array} nodes
     * @returns {Array} Array of sorted, uniq'd nodes
     */
    sortAndUniqueNodes(nodes) {
        nodes.sort(sortArrayOfNodes);
        return uniqBy(nodes, 'letter');
    }

    /**
     * Sorts array of Node objects in place
     * @param {Array} nodes
     * @returns nodes
     */
    sortNodes(nodes) {
        nodes.sort(sortArrayOfNodes);
        return nodes;
    }

    addNodeToOrder(node) {
        this.order += node.letter;
        node.isCompleted = true;
    }

    generateOrder() {
        // Find all elements that have no parents
        let nodes = [];
        Object.values(this.tree).forEach(node => {
            if (!node.parents.length) {
                nodes.push(node);
            }
        });

        this.sortNodes(nodes);



        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];

            if (!node.isCompleted && node.canBeCompleted) {
                this.addNodeToOrder(node);

                nodes = nodes.concat(node.children);
                nodes = this.sortAndUniqueNodes(nodes);

                // This is NOT efficient, rethink this
                i = 0;
            }
        }


        console.log(this.order);
        return this.order;
    }
}

module.exports = Tree;
