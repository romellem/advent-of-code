const GameGraph = require('./game.js');

let game = new GameGraph();
game.buildTree();

console.log(game.win_nodes.length);
console.log(game.loss_nodes.length);