const GameGraph = require('./game-bfs.js');

let game = new GameGraph();
console.log('Running');
game.buildTree();
console.log('Getting shortest paths');
let paths = game.getWinningPaths();
let weights = paths.map(p => p.weight);
weights.sort((a, b) => a - b);

console.log(weights[0]);
console.log('=======');
console.log(weights);


// console.log(game.win_nodes.length);
// console.log(game.loss_nodes.length);