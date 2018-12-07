const { uniqBy } = require('lodash');
const sortArrayOfNodes = (a, b) => {
    if (a.letter < b.letter) return -1;
    else if (a.letter > b.letter) return 1;
    else return 0;
};

class Node {
    constructor(letter) {
        this.letter = letter;
        this.parent;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);

        // @todo Don't sort after every insertion, sort once when everything has been added
        this.children.sort(sortArrayOfNodes);

        return this.children;
    }

    setParent(node) {
        return (this.parent = node);
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

            this.tree[pre].addChild(this.tree[post]);
            this.tree[post].setParent(this.tree[pre]);
        });
    }

    generateVisArrays() {
        let nodes = [];
        Object.keys(this.tree).forEach((l, i) => {
            nodes.push({ id: l.charCodeAt() - 64, label: l });
        });

        // Build edges
        let edges = [];
        Object.values(this.tree).forEach(node => {
            if (node.children.length) {
                node.children.forEach(child => {
                    edges.push({
                        from: node.letter.charCodeAt() - 64,
                        to: child.letter.charCodeAt() - 64,
                    });
                });
            }
        });

        console.log('// Nodes');
        console.log(JSON.stringify(nodes));

        console.log('\n// Edges');
        console.log(JSON.stringify(edges));
    }

    generateMermaidConfig() {
        let nodes = this.rawLines.map(line => {
            let [match, pre, post] = TREE_LINE_REGEX.exec(line);
            return `    ${pre}-->${post};`;
        });

        console.log(`graph TD;\n${nodes.join('\n')}`);
    }

    /**
     * @param {Array} nodes
     * @returns {Array} Array of sorted, uniq'd nodes
     */
    sortAndUniqueNodes(nodes) {
        nodes.sort(sortArrayOfNodes);
        return uniqBy(nodes, 'letter');
    }

    generateOrder() {
        let order = '';

        // Find all elements that have no parents
        let nodes = [];
        Object.values(this.tree).forEach(node => {
            if (!node.parent) {
                nodes.push(node);
            }
        });

        nodes = this.sortAndUniqueNodes(nodes);

        while (nodes.length) {
            let current_node;
            do {
                current_node = nodes.shift();
            } while (order.includes(current_node.letter));

            order += current_node.letter;

            if (current_node.children.length) {
                nodes = nodes.concat(current_node.children);
                nodes = this.sortAndUniqueNodes(nodes);
            }
        }

        console.log(order);
        return order;
    }
}

module.exports = Tree;
