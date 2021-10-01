import { Game } from './explore-grid.js';
import { input } from './input.js';

const loader = document.getElementById('loader');
const app = document.getElementById('app');
const input_ele = document.getElementById('input');
const start_button = document.getElementById('start');

input_ele.value = input.join(',');

let game;

start_button.addEventListener('click', function loadComputer(e) {
	let memory = String(input_ele.value)
		.split(',')
		.map((v) => parseInt(v, 10));

	game = new Game(memory, app);
	game.draw();

	// Remove loader
	loader.parentNode.removeChild(loader);
});
