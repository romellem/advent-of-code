class Node {
    constructor({children, meta}) {
        this.meta = meta;
        this.children = children;
    }

    // Part one
    getMetaSum() {
        let self_meta_sum = this.meta.reduce((a, b) => a + b, 0);

        let child_sum = [];
        if (this.children.length) {
            child_sum = this.children.map(n => n.getMetaSum())
        }

        return self_meta_sum + child_sum.reduce((a, b) => a + b, 0);
    }

    // Part two
    getValue() {
        let self_meta_sum = this.meta.reduce((a, b) => a + b, 0);
        if (!this.children.length) {
            return self_meta_sum;
        }

        // Otherwise, get values of its children
        let child_sum = this.meta.map(index => {
            let child = this.children[index - 1];
            if (child) {
                return child.getValue();
            } else {
                return 0;
            }
        });

        return child_sum.reduce((a, b) => a + b, 0);
    }
}

class Tree {
    constructor(list) {
        this.list = list;

        this.head = this.parseList(list.slice(0));
    }

    parseList(list) {
        let child_nodes_num = list.shift();
        let metadata_nodes_num = list.shift();

        let child_nodes = [];
        for (let i = 0; i < child_nodes_num; i++) {
            let child = this.parseList(list);
            child_nodes.push(child);
        }

        let metadata_nodes = [];
        for (let i = 0; i < metadata_nodes_num; i++) {
            metadata_nodes.push(list.shift());
        }

        let node = new Node({
            children: child_nodes,
            meta: metadata_nodes
        });

        return node;
    }
}

module.exports = Tree;
