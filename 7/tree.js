const { uniqBy } = require('lodash');
const sortArrayOfNodes = (a, b) => {
    if (a.letter < b.letter) return -1;
    else if (a.letter > b.letter) return 1;
    else return 0;
};

class Worker {
    constructor() {
        this.node;
    }

    work() {
        if (this.node) {
            this.node.time -= 1;
            if (this.node.time < 1) {
                this.node.isCompleted = true;
            }

            return this.node.isCompleted;
        }
    }

    setNode(node) {
        this.node = node;
    }

    unsetNode() {
        this.node = undefined;
    }

    get isWorking() {
        return Boolean(this.node);
    }
}

class Node {
    constructor(letter) {
        this.letter = letter;
        this.parents = [];
        this.children = [];

        // Initialize to _not_ being added to our order.
        this.isCompleted = false;

        this.time;
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

    setTimeToComplete(base_time) {
        this.time = this.letter.charCodeAt() - 64 + base_time;
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

    isTimedWorkCompleted() {
        let nodes = Object.values(this.tree);
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            if (!node.isCompleted) {
                return false;
            }
        }

        return true;
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

        outerWhileLoop: while (nodes.length) {
            innerForLoop: for (let i = 0; i < nodes.length; i++) {
                let node = nodes[i];

                // Search for first node that can be added to order
                if (!node.isCompleted && node.canBeCompleted) {
                    this.addNodeToOrder(node);

                    // Delete the node within our nodes array, it has already been added
                    nodes.splice(i, 1);

                    nodes = nodes.concat(node.children);
                    nodes = this.sortAndUniqueNodes(nodes);

                    // Break our for loop so we start at the beginning
                    break innerForLoop;
                }
            }
        }

        return this.order;
    }

    calculateTime(num_workers, min_time) {
        let workers = Array(num_workers)
            .fill()
            .map(n => new Worker());

        Object.values(this.tree).forEach(node => {
            node.setTimeToComplete(min_time);
        });

        // Find all elements that have no parents
        let nodes = [];
        Object.values(this.tree).forEach(node => {
            if (!node.parents.length) {
                nodes.push(node);
            }
        });

        let isBeingWorkedOn = {};

        const getFirstWorkerThatIsntWorking = () => {
            for (let i = 0; i < workers.length; i++) {
                let worker = workers[i];
                if (!worker.node) {
                    return worker;
                }
            }
        };

        this.sortNodes(nodes);

        let total_work = 0;
        while (!this.isTimedWorkCompleted()) {
            workers.forEach(worker => {
                if (!worker.isWorking) {
                    // Get first node that can be worked on
                    for (let i = 0; i < nodes.length; i++) {
                        let node = nodes[i];
                        if (node.canBeCompleted) {
                            worker.setNode(node);
                            isBeingWorkedOn[node.letter] = true;

                            // Delete the node within our nodes array, it is being worked on
                            nodes.splice(i, 1);
                            break;
                        }
                    }
                }
            });

            // Now that all workers have been assigned, let them do work
            workers.forEach(worker => {
                let current_worker_is_done = worker.work();
                if (current_worker_is_done) {
                    // Adds child nodes to our list
                    nodes = nodes.concat(worker.node.children);
                    nodes = this.sortAndUniqueNodes(nodes);

                    // Free up worker for re-assignment
                    worker.unsetNode();
                }
            });
            total_work++;
        }

        return total_work;
    }
}

module.exports = Tree;
