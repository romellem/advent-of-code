const fs = require('fs');
// const input = require('./input');
const Cave = require('./cave');

const target_coords = [10, 10];
// let cave = new Cave(5616, target_coords);
let cave = new Cave(510, target_coords, 2, 2);

// console.log(cave.printGrid(16, 16))

// console.log(JSON.stringify(cave.getGraphEdges(), null, '\t'));
const edges = cave.getGraphEdges();
const nodes = cave.getGraphNodes();

const solution_path = cave.getShortestPathToTarget();
const solution_path_lookup = {};
solution_path.forEach(p => (solution_path_lookup[p] = true));

let nodes_to_render_lookup = {};
nodes.forEach(node => (nodes_to_render_lookup[node] = 2));
solution_path.forEach(node => (nodes_to_render_lookup[node] = 1));

nodes_to_render_lookup[`0,0,2`] = 3;
nodes_to_render_lookup[`${target_coords[0]},${target_coords[1]},2`] = 4;

const nodes_to_render = Object.keys(nodes_to_render_lookup).map(node => {
    let group = nodes_to_render_lookup[node];

    return {
        id: node,
        group,
    };
});

const data = {
    nodes: nodes_to_render,
    links: edges.map(e => ({source: e[0], target: e[1]})),
};

console.log(
    `${data.nodes.length} + ${data.links.length} = ${data.nodes.length + data.links.length}`
);
fs.writeFileSync('sample-data.json', JSON.stringify(data, null, '\t'));
