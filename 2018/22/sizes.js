const fs = require('fs');
// const input = require('./input');
const Cave = require('./cave');

const target_coords = [10, 785];
let cave = new Cave(5616, target_coords);
// let cave = new Cave(510, [10, 10]);

// console.log(cave.printGrid(16, 16))

// console.log(JSON.stringify(cave.getGraphEdges(), null, '\t'));
// const edges = cave.getGraphEdges();
const nodes = cave.getGraphNodes();

const nodes_lookup = {};
nodes.forEach(node => (nodes_lookup[node] = true));

const solution_path = cave.getShortestPathToTarget();
const solution_path_lookup = {};
solution_path.forEach(p => (solution_path_lookup[p] = true));

const getValidNeighboars = node => {
    let [x, y, tool] = node.split(',');

    let neighbor_coords = [`${x - 1},${y}`, `${x + 1},${y}`, `${x},${y - 1}`, `${x},${y + 1}`];

    let tools = [0, 1, 2];

    let possible_vals = [];

    neighbor_coords.forEach(new_coord => {
        tools.forEach(tool => {
            possible_vals.push(new_coord + ',' + tool);
        });
    });

    return possible_vals.filter(coord => nodes_lookup[coord]);
};

let neighbor_edges = [];

let nodes_to_render_lookup = {};
solution_path.forEach(node => {
    let neighbors = getValidNeighboars(node);
    neighbors.forEach(neighbor => {
        nodes_to_render_lookup[neighbor] = 2;

        neighbor_edges.push({ source: node, target: neighbor });
    });
});

solution_path.forEach(node => {
    nodes_to_render_lookup[node] = 1;
});

nodes_to_render_lookup[`0,0,2`] = 3;
nodes_to_render_lookup[`${target_coords[0]},${target_coords[1]},2`] = 3;

const nodes_to_render = Object.keys(nodes_to_render_lookup).map(node => {
    let group = nodes_to_render_lookup[node];

    return {
        id: node,
        group,
    };
});

let solution_edges = [];
for (let i = 0; i < solution_path.length - 2; i++) {
    let a = solution_path[i];
    let b = solution_path[i + 1];

    solution_edges.push({ source: a, target: b });
}

const data = {
    nodes: nodes_to_render,
    links: solution_edges.concat(neighbor_edges),
};

console.log(
    `${data.nodes.length} + ${data.links.length} = ${data.nodes.length + data.links.length}`
);
fs.writeFileSync('data.json', JSON.stringify(data, null, '\t'));
