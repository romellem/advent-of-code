const GameGraph = require('./game.js');

let game = new GameGraph();
game.buildTree();
let paths = game.getWinningPaths();
let weights = paths.map(p => p.weight);
weights.sort((a, b) => a - b);

console.log(weights[0]);
console.log('=======');
console.log(weights);


// console.log(game.win_nodes.length);
// console.log(game.loss_nodes.length);