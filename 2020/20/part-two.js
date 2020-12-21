// const { strictEqual } = require('assert');
const { input, sampleInput1 } = require('./input');
const { PuzzlePiece, Puzzle } = require('./puzzle');

let pieces = input.map((piece) => new PuzzlePiece(piece));
let puzzle = new Puzzle(pieces);
puzzle.connectPieces();
puzzle.orientPieces();
puzzle.printOrientedPieces();
