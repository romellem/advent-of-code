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
            let program = this.programs[from];
            to.forEach(to_id => {
                let to_program = this.programs[to_id];
                program.connect(to_program);
            });
        });
    }

    countConnectedPrograms(root_program_id = 0) {
        // Assumes `this.programs` has been initialized and connected
        let program = this.programs[root_program_id];
        let running_children_count = program.children.length;
        for (let i = 0; i < program.children.length; i++) {
            let child = program.children[i];
            running_children_count += this.countConnectedPrograms(child.id);
        }

        return running_children_count;
    }
}

module.exports = PipedStream;
