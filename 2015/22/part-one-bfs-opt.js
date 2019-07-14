const GameGraph = require('./game-bfs-opt.js');

let game = new GameGraph();
console.log('Running');
try { game.buildTree() } catch (e) {
    debugger;
    console.log(e);
}
console.log('Number of nodes: ', game.graph.nodes().length);
console.log('Getting shortest paths');
let paths = game.getWinningPaths();
let weights = paths.map(p => p.weight);
weights.sort((a, b) => a - b);

console.log(weights[0]);
console.log('=======');
console.log(weights);


// console.log(game.win_nodes.length);
// console.log(game.loss_nodes.length);