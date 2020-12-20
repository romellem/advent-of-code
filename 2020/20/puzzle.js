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
	constructor(piece) {
		this.piece_str = JSON.stringify(piece);
		this.piece = JSON.parse(this.piece_str);
		this.orientations = this.generateOrientations();
		this.edge_length = this.piece.length;

		this.top = new Set();
		this.left = new Set();
		this.right = new Set();
		this.bottom = new Set();
	}

	/**
	 * @returns {Array<String>} - Returns an array of unique orientations for the puzzle piece.
	 */
	generateOrientations() {
		let orientations = [];
		for (let i = 0; i < 4; i++) {
			rotate(this.piece);
			orientations.push(this.piece.toString());
			flipY(this.piece);
			orientations.push(this.piece.toString());
		}

		return uniq(orientations);
	}

	getEdge(side) {
		switch (side) {
			case TOP:
				return this.row(0);
			case BOTTOM:
				return this.row(this.outer_index);
			case LEFT:
				return this.col(0);
			case RIGHT:
				return this.col(this.outer_index);
		}
	}

	row(i, square_str) {
		if (square_str) {
		} else {
			return this.piece[i].join('');
		}
	}
	col(i, square_str) {
		if (square_str) {
		} else {
			let str = '';
			for (let y = 0; y < this.piece.length; y++) {
				str += this.piece[y][i];
			}
			return str;
		}
	}

	fit(other_piece, side) {
		const other_side = SIDE_COMPLEMENT[side];
		this[side].add(other_piece);
		other_piece[other_side].add(this);
	}

	tryToFit(other_piece) {
		for (let side of SIDES) {
			let other_side = SIDE_COMPLEMENT[side];
		}
	}

	canFit(other_piece) {
		let can_fit = false;
		for (let i = 0; i < 4; i++) {
			rotate(this.piece);
			for (let attempt of [
				['top', 'row', 0, 9],
				['bottom', 'row', 9, 0],
				['left', 'col', 0, 9],
				['right', 'col', 9, 0],
			]) {
				let [place, fn, this_n, that_n] = attempt;
				let this_val = this[fn](this_n);
				let other_val = other_piece[fn](that_n);
				if (this_val === other_val && !this[place].includes(other_piece)) {
					this[place].push(other_piece);
					can_fit = true;
				}
			}

			flipY(this.piece);
			for (let attempt of [
				['top', 'row', 0, 9],
				['bottom', 'row', 9, 0],
				['left', 'col', 0, 9],
				['right', 'col', 9, 0],
			]) {
				let [place, fn, this_n, that_n] = attempt;
				let this_val = this[fn](this_n);
				let other_val = other_piece[fn](that_n);
				if (this_val === other_val && !this[place].includes(other_piece)) {
					this[place].push(other_piece);
					can_fit = true;
				}
			}
		}

		return can_fit;
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

	solve() {
		for (let [a, b] of G.combination(this.pieces, 2)) {
			a.canFit(b);
		}

		let tl = 0;
		let tr = 0;
		let bl = 0;
		let br = 0;
		for (let piece of this.pieces) {
			if (piece.top.length === 0 && pieces.left.length === 0) {
				console.log('tl', ++tl);
			}
			if (piece.top.length === 0 && pieces.right.length === 0) {
				console.log('tr', ++tr);
			}
			if (piece.bottom.length === 0 && pieces.left.length === 0) {
				console.log('bl', ++bl);
			}
			if (piece.bottom.length === 0 && pieces.right.length === 0) {
				console.log('br', ++br);
			}
		}
	}
}

module.exports = { Puzzle, Piece };
