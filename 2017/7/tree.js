const assert = require('assert');

class Node {
    constructor(id, weight) {
        this.id = id;
        this.weight = weight;
        this._totalWeight;

        this.children = [];
        this.parent = null;
        this.level = undefined;
    }

    isBalanced() {
        if (!this.children.length) {
            return true;
        }

        let children_weight_map = {};
        let children_weight = this.children.forEach(
            n => (children_weight_map[n.totalWeight] = true)
        );
        return Object.keys(children_weight_map).length === 1;
    }

    get totalWeight() {
        if (this._totalWeight === undefined) {
            let weight = this.weight;
            if (this.children.length) {
                weight += this.children.map(n => n.totalWeight).reduce((a, b) => a + b, 0);
            }

            this._totalWeight = weight;
        }

        return this._totalWeight;
    }

    addChild(node) {
        this.children.push(node);
    }

    setParent(node) {
        this.parent = node;
    }

    fillInChildrenLevels(passed_level) {
        let level = this.level === undefined ? passed_level : this.level;
        this.children.forEach(n => {
            n.level = level + 1;
            n.fillInChildrenLevels();
        });
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
        this.head.level = 0;
        this.head.fillInChildrenLevels();

        // Cache the total weights;
        this.head.totalWeight;
    }

    getUnbalancedNodes() {
        let nodes = Object.values(this.nodes).filter(n => !n.isBalanced());
        return nodes;
    }

    // This code is sloppy. Sorry.
    findOneUnbalancedNodeNewTargetTotalWeight() {
        let unbalanced = this.getUnbalancedNodes();
        unbalanced.sort((a, b) => a.level - b.level);
        let deepest_node = unbalanced.pop();

        let child_weight_counts = {};
        deepest_node.children.forEach(n => {
            if (child_weight_counts[n.totalWeight] === undefined) {
                child_weight_counts[n.totalWeight] = 0;
            }
            child_weight_counts[n.totalWeight]++;
        });

        // Find node that is different than its siblings
        let child_weight_entires = Object.entries(child_weight_counts);
        assert.strictEqual(child_weight_entires.length, 2);

        let differing_weight = parseInt(
            child_weight_entires.filter(([weight, count]) => count === 1).pop()[0]
        );
        let target_weight = parseInt(
            child_weight_entires.filter(([weight, count]) => +weight !== differing_weight).pop()[0]
        );

        let differing_node = deepest_node.children.filter(
            n => n.totalWeight === differing_weight
        )[0];

        let weight_change = target_weight - differing_weight;
        return differing_node.weight + weight_change;
    }
}

module.exports = Tree;
