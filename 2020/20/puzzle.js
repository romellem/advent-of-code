const { uniq } = require('lodash');
const G = require('generatorics');

const TOP = 'top';
const LEFT = 'left';
const RIGHT = 'right';
const BOTTOM = 'bottom';
const SIDE_COMPLEMENT = {
	[TOP]: BOTTOM,
	[LEFT]: RIGHT,
	[RIGHT]: LEFT,
	[BOTTOM]: TOP,
};
const SIDES = Object.keys(SIDE_COMPLEMENT);

/**
 * Rotates a square 2d array 90 degrees clockwise in place.
 * @link https://code.likeagirl.io/rotate-an-2d-matrix-90-degree-clockwise-without-create-another-array-49209ea8b6e6
 * @param {Array<Array>} matrix
 * @returns {Array<Array>} - Returns the reference to our original matrix
 */
function rotate(matrix) {
	const n = matrix.length;
	const x = Math.floor(n / 2);
	const y = n - 1;
	for (let i = 0; i < x; i++) {
		for (let j = i; j < y - i; j++) {
			let k = matrix[i][j];
			matrix[i][j] = matrix[y - j][i];
			matrix[y - j][i] = matrix[y - i][y - j];
			matrix[y - i][y - j] = matrix[j][y - i];
			matrix[j][y - i] = k;
		}
	}

	return matrix;
}

/**
 * Flips a matrix in the `y` direction in place.
 * @param {Array<Array>} matrix
 * @returns {Array<Array>} - Returns the reference to our original matrix
 */
function flipY(matrix) {
	const n = matrix.length;
	const half = Math.floor(n / 2);
	for (let i = 0; i < half; i++) {
		let t = matrix[i];
		matrix[i] = matrix[n - (i + 1)];
		matrix[n - (i + 1)] = t;
	}

	return matrix;
}

/**
 * Flips a matrix in the `x` direction in place.
 * This can also be achieved by rotating 180 degrees
 * and flipping in the `y` direction, so this method
 * goes unused in our code below. Including for
 * completeness sake.
 *
 * @param {Array<Array>} matrix
 * @returns {Array<Array>} - Returns the reference to our original matrix
 */
function flipX(matrix) {
	const n = matrix.length;
	const x = matrix[0].length;
	const half = Math.floor(x / 2);
	for (let i = 0; i < half; i++) {
		for (let j = 0; j < n; j++) {
			let t = matrix[j][i];
			matrix[j][i] = matrix[j][n - (i + 1)];
			matrix[j][n - (i + 1)] = t;
		}
	}

	return matrix;
}

class PuzzlePiece {
	/**
	 * 
	 * @param {Object} opt
	 * @param {Number} opt.id 
	 * @param {String} opt.piece 
	 */
	constructor({ id, piece }) {
		this.id = id;
		this.piece_str = piece;
		this.piece = piece.split('\n').map(row => row.split(''));
		this.edge_length = this.piece.length;

		this.orientations = this.generateOrientations();

		this.connections = new Set();
	}

	/**
	 * @returns {Array<String>} - Returns an array of unique orientations for the puzzle piece.
	 */
	generateOrientations() {
		let orientations = [];
		for (let i = 0; i < 4; i++) {
			orientations.push(this.toString());
			flipY(this.piece);
			orientations.push(this.toString());
			flipY(this.piece);
			rotate(this.piece);
		}

		return uniq(orientations);
	}

	getEdge(side, square_str) {
		switch (side) {
			case TOP:
				return this.row(0, square_str);
			case BOTTOM:
				return this.row(this.edge_length - 1, square_str);
			case LEFT:
				return this.col(0, square_str);
			case RIGHT:
				return this.col(this.edge_length - 1, square_str);
		}
	}

	row(i, square_str) {
		if (square_str) {
			const n = this.edge_length;

			// Add `i` to offset the '\n' chars
			return square_str.slice(i * n + i, i * n + n + i);
		} else {
			return this.piece[i].join('');
		}
	}

	col(i, square_str) {
		let str = '';
		if (square_str) {
			for (let row = 0; row < this.edge_length; row++) {
				// Add `row` to offset the '\n' chars
				let y = row * this.edge_length + row + i;
				str += square_str[y];
			}
		} else {
			for (let y = 0; y < this.piece.length; y++) {
				str += this.piece[y][i];
			}
		}

		return str;
	}

	fit(other_piece) {
		this.connections.add(other_piece);
		other_piece.connections.add(this);
	}

	tryToFit(other_piece) {
		for (let side of SIDES) {
			let other_side = SIDE_COMPLEMENT[side];
			for (let [self, other] of G.cartesian(this.orientations, other_piece.orientations)) {
				let self_edge = this.getEdge(side, self);
				let other_edge = this.getEdge(other_side, other);
				if (self_edge === other_edge) {
					this.fit(other_piece);
					break;
				}
			}
		}
	}

	countConnections() {
		return this.connections.size;
	}

	/**
	 * @returns {String} - Returns string of _current_ piece orientation.
	 */
	toString() {
		return this.piece.map((row) => row.join('')).join('\n');
	}
}

class Puzzle {
	constructor(pieces) {
		this.pieces = pieces;
	}

	connectPieces() {
		for (let [piece_a, piece_b] of G.combination(this.pieces, 2)) {
			piece_a.tryToFit(piece_b);
		}

		for (let piece of this.pieces) {
			console.log(piece.countConnections());
		}
	}
}

module.exports = { Puzzle, PuzzlePiece };
