const { uniq } = require('lodash');
const G = require('generatorics');
const C = require('colors');

const TOP = 'top';
const LEFT = 'left';
const RIGHT = 'right';
const BOTTOM = 'bottom';

/**
 * @typedef {String} Side
 */

/**
 * @enum {Side}
 */
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

function splitSquare(square) {
	return square.split('\n').map((row) => row.split(''));
}

function highlight(square, side, color = 'yellow') {
	const height = square.length;
	const width = square[0].length;
	switch (side) {
		case TOP:
			for (let x = 0; x < width; x++) {
				square[0][x] = C[color](square[0][x]);
			}
			break;
		case BOTTOM:
			for (let x = 0; x < width; x++) {
				square[height - 1][x] = C[color](square[height - 1][x]);
			}
			break;
		case LEFT:
			for (let y = 0; y < height; y++) {
				square[y][0] = C[color](square[y][0]);
			}
			break;
		case RIGHT:
			for (let y = 0; y < height; y++) {
				square[y][width - 1] = C[color](square[y][width - 1]);
			}
			break;
	}
	return square;
}

function joinMatrix(matrix_a, matrix_b) {
	for (let y = 0; y < matrix_a.length; y++) {
		matrix_a[y] = matrix_a[y].concat(matrix_b[y]);
	}

	return matrix_a;
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
		this.piece = piece.split('\n').map((row) => row.split(''));
		this.edge_length = this.piece.length;

		this.orientations = this.generateOrientations();

		// When we build our overall picture, each piece will get a fixed orientation
		this.choosen_orientation = undefined;
		this.choosen_sides = SIDES.reduce((obj, side) => ((obj[side] = undefined), obj), {});

		this.connections = new Set();
		this.connections_array = undefined;
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

	getOrientationAsPieceArray(i) {
		return this.orientations[i].split('\n').map((row) => row.split(''));
	}

	/**
	 * @param {Side} side
	 * @param {String} square_str
	 */
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

	convertConnectionsToArray() {
		this.connections_array = [...this.connections];
	}

	fit(other_piece) {
		this.connections.add(other_piece);
		other_piece.connections.add(this);
	}

	canJoinOrientationWithOtherAlong(self_orientation, other_orientation, self_side) {
		let other_side = SIDE_COMPLEMENT[self_side];
		let self_edge = this.getEdge(self_side, self_orientation);
		let other_edge = this.getEdge(other_side, other_orientation);

		return self_edge === other_edge;
	}

	tryToFit(other_piece, orientation_index = 0) {
		/**
		 * Pick some random orientation for itself.
		 * Building the connections, I don't care _how_
		 * they connect together. So, I only need to take
		 * _some_ orientation and then test that against all
		 * the orientations of the other piece (in all possible
		 * sides). This is faster than looking at all _pairs_
		 * of both collections of orientations.
		 */
		let self = this.orientations[orientation_index];
		for (let side of SIDES) {
			for (let other of other_piece.orientations) {
				let can_be_joined = this.canJoinOrientationWithOtherAlong(self, other, side);
				if (can_be_joined) {
					this.fit(other_piece);
					return;
				}
			}
		}
	}

	orientToConnections() {
		if (!this.choosen_orientation) {
			throw new Error(
				`A PuzzlePiece must have a choosen_orientation before it can orient its connections.`
			);
		}

		for (let piece of this.connections) {
			sides_loop: for (let side of SIDES) {
				// Skip the piece if it already has a choosen orientation at this side
				if (this.choosen_sides[side]) {
					continue;
				}

				for (let adjacent_orientation of piece.orientations) {
					let can_be_joined = this.canJoinOrientationWithOtherAlong(
						this.choosen_orientation,
						adjacent_orientation,
						side
					);

					if (can_be_joined) {
						const other_side = SIDE_COMPLEMENT[side];

						piece.choosen_orientation = adjacent_orientation;
						piece.choosen_sides[other_side] = this;
						this.choosen_sides[side] = piece;

						break sides_loop;
					}
				}
			}
		}
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
			// If a piece has 4 connections, we know it won't get anymore, so no need to test
			if (piece_a.connections.size < 4 && piece_b.connections.size < 4) {
				piece_a.tryToFit(piece_b);
			}
		}

		for (let piece of this.pieces) {
			piece.convertConnectionsToArray();
		}
	}

	/**
	 * Assumes we don't have trickery where a piece can have multiple connections
	 * but an _optimal_ orientation and grid alignment puts it in the right place.
	 * Looks like our input _does indeed_ generate pieces with 2, 3, or 4 connections.
	 *
	 * @note Ah, and maybe this _is_ a safe assumption due to the instructions:
	 *
	 * > Each tile's image data includes a border that should line up exactly with its
	 * > adjacent tiles. All tiles have this border, and the border lines up exactly
	 * > when the tiles are both oriented correctly. Tiles at the edge of the image also
	 * > have this border, **but the outermost edges won't line up with any other tiles.**
	 *
	 * Emphasis added at the end. So we know that we don't have an adversarial input
	 * where the edges and corners line up with other tiles. However, it isn't clear
	 * if some inner tile could have more than 4 possible connections, but only one
	 * of them allows for all tiles to be arranged in its 12 x 12 grid.
	 */
	getPiecesWithNConnections(n) {
		return this.pieces.filter((piece) => piece.connections.size === n);
	}

	orientPieces() {
		/**
		 * Here is a question: of my four corners, which one is the top left?
		 * Which one is the bottom right? The answer is: _it doesn't matter!_
		 *
		 * Because the overall picture _itself_ can be rotated and flipped, I
		 * just need to pick a *valid* corner, fix one of its orientations, then
		 * start building my picture recursively based on its connections.
		 *
		 * After I have all the pieces oriented, I can strip off the "border" of each
		 * tile (shrinking each piece from 10 x 10 to 8 x 8) and join all 144 of them
		 * together into a 12 x 12 picture, making one large 96 x 96 grid (8 * 12 = 96).
		 */
		let [corner] = this.getPiecesWithNConnections(2);
		corner.choosen_orientation = corner.orientations[0];
		this.orientPiecesFrom(corner);
	}

	orientPiecesFrom(piece) {
		let pieces = [piece];
		while (pieces.length) {
			let current_piece = pieces.pop();
			let adjacents_without_choosen_orientations = current_piece.connections_array.filter(
				(p) => !p.choosen_orientation
			);
			pieces.push(...adjacents_without_choosen_orientations);

			current_piece.orientToConnections();
		}
	}

	printOrientedPieces() {
		let [top_left] = this.getPiecesWithNConnections(2).filter(
			(p) =>
				p.choosen_sides[RIGHT] &&
				p.choosen_sides[BOTTOM] &&
				!p.choosen_sides[LEFT] &&
				!p.choosen_sides[TOP]
		);

		let stripes = [splitSquare(top_left.choosen_orientation)];
		highlight(stripes[0], RIGHT);
		highlight(stripes[0], BOTTOM);

		let far_left = top_left;
		let self = top_left.choosen_sides[RIGHT];
		for (let y = 0; y < 12; y++) {
			for (let x = 0; x < 11; x++) {
				let square = splitSquare(self.choosen_orientation);
				highlight(square, LEFT);
				if (x < 10) highlight(square, RIGHT);
				if (y > 0) highlight(square, TOP);
				if (y < 11) highlight(square, BOTTOM);
				joinMatrix(stripes[y], square);

				self = self.choosen_sides[RIGHT];
			}
			far_left = far_left.choosen_sides[BOTTOM];
			if (far_left) {
				let square = splitSquare(far_left.choosen_orientation);
				highlight(square, RIGHT);
				highlight(square, TOP);
				if (y < 11) highlight(square, BOTTOM);
				stripes.push(square);
				self = far_left.choosen_sides[RIGHT];
			}

			
		}

		let str = stripes.map(row => row.join('')).join('\n');
		console.log(str);
	}
}

module.exports = { Puzzle, PuzzlePiece };
