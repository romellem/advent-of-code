const G = require('generatorics');

/**
 * Rotates a square 2d array 90 degrees clockwise in place
 * @link https://code.likeagirl.io/rotate-an-2d-matrix-90-degree-clockwise-without-create-another-array-49209ea8b6e6
 * @param {Array<Array>} matrix
 * @returns {Array<Array>}
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
 * @returns {Array<Array>}
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

function picture(squares) {}

class Piece {
	constructor(piece) {
		this.piece_str = JSON.stringify(piece);
		this.piece = JSON.parse(this.piece_str);

		this.top = [];
		this.left = [];
		this.right = [];
		this.bottom = [];
	}

	row(i) {
		let str = '';
		for (let x = 0; x < this.piece[i].length; x++) {
			str += this.piece[i][x];
		}
		return str;
	}
	col(i) {
		let str = '';
		for (let y = 0; y < this.piece.length; y++) {
			str += this.piece[y][i];
		}
		return str;
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

	toString() {
		return this.piece_str;
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
