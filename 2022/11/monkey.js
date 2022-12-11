/**
 * @typedef {Object} MonkeyConfig
 * @property {number} id
 * @property {Set<number>} items
 * @property {(oldWorry: number) => number} worry
 * @property {number} divisible_by
 * @property {number} if_true
 * @property {number} if_false
 */

class Monkey {
	/**
	 * @param {MonkeyConfig} config
	 */
	constructor(config) {
		this.id = config.id;
		this.items = config.items;
		this.worry = config.worry;
		this.divisible_by = config.divisible_by;
		this.if_true = config.if_true;
		this.if_false = config.if_false;
	}
}
