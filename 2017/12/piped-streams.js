const { fromPairs } = require('lodash');

class Program {
    constructor(id) {
        this.id = id;
        this.children = [];
    }

    connect(program) {
        if (!this.children.includes(program)) {
            this.children.push(program);
        }

        return this.children;
    }
}

class PipedStream {
    constructor(streams_orig) {
        // Poor man's deep clone
        let streams = JSON.parse(JSON.stringify(streams_orig));
        this.streams = streams;

        this.programs = this.convertStreamsToUnconnectedPrograms();
        this.connectPrograms();
    }

    convertStreamsToUnconnectedPrograms() {
        let id_map = {};
        this.streams.forEach(({ from, to }) => {
            id_map[from] = true;
            to.forEach(to_id => {
                id_map[to_id] = true;
            });
        });

        let ids = Object.keys(id_map);
        ids.sort((a, b) => a - b);

        let id_program_pairs = ids.map(id => [id, new Program(id)]);

        // { 1: new Program(1), 2: new Program(2), etc. }
        return fromPairs(id_program_pairs);
    }

    connectPrograms() {
        this.streams.forEach(({ from, to }) => {
            let from_program = this.programs[from];
            to.forEach(to_id => {
                let to_program = this.programs[to_id];

                if (from_program !== to_program) {
                    from_program.connect(to_program);
                    to_program.connect(from_program);
                }
            });
        });
    }

    getConnectedPrograms(root_program_id = 0, connected_to = {}) {
        // Assumes `this.programs` has been initialized and connected
        let program = this.programs[root_program_id];

        let to_count = [];
        program.children.forEach(child => {
            let { id } = child;

            // If we haven't seen this before, then visit its children
            if (!connected_to[id]) {
                connected_to[id] = child;
                to_count.push(child);
            }

            // Otherwise, we've counted this (and subsequently its children) so we can skip it
        });

        // Recursively add children's children to `connected_to`
        for (let child of to_count) {
            this.countConnectedPrograms(child.id, connected_to);
        }

        // Return number of programs we saw, only really valid on last call
        return Object.values(connected_to);
    }

    countConnectedPrograms(root_program_id = 0, connected_to = {}) {
        return this.getConnectedPrograms(root_program_id, connected_to).length;
    }
}

module.exports = PipedStream;
