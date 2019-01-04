const assert = require('assert');

class Node {
    constructor(id, weight) {
        this.id = id;
        this.weight = weight;

        this.children = [];
        this.parent = null;
    }

    addChild(node) {
        this.children.push(node);
    }

    setParent(node) {
        this.parent = node;
    }
}

class Tree {
    constructor(data) {
        this.nodes = {};
        data.forEach(node => {
            let { id, weight } = node;
            if (!this.nodes[id]) {
                this.nodes[id] = new Node(id, weight);
            }
        });

        data.forEach(n => {
            let { id, children } = n;
            let node = this.nodes[id];

            children.forEach(c_ids => {
                let child = this.nodes[c_ids];
                node.addChild(child);
                child.setParent(node);
            });
        });

        let nodes_with_no_parent = Object.values(this.nodes).filter(n => n.parent === null);
        assert.strictEqual(nodes_with_no_parent.length, 1);

        this.head = nodes_with_no_parent[0];
    }
}

module.exports = Tree;
