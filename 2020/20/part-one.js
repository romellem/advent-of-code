const { input, sampleInput1 } = require('./input');
const { PuzzlePiece, Puzzle } = require('./puzzle');

let pieces = input.map((piece) => new PuzzlePiece(piece));
let puzzle = new Puzzle(pieces);
puzzle.connectPieces();
let corners = puzzle.getIdsOfPiecesWithNConnections(2);
let product = corners.reduce((a, b) => a * b, 1);
console.log(product);
