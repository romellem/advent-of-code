const { strictEqual } = require('assert');
const { input } = require('./input');
const { PuzzlePiece, Puzzle } = require('./puzzle');

let pieces = input.map((piece) => new PuzzlePiece(piece));
let puzzle = new Puzzle(pieces);
puzzle.connectPieces();
let corners = puzzle.getPiecesWithNConnections(2);
let corners_ids = corners.map((p) => p.id);
let product = corners_ids.reduce((a, b) => a * b, 1);
console.log(product);

strictEqual(product, 17250897231301);
