import { useEffect, useState } from 'react';

// @see https://usehooks.com/useKeyPress/
function useKeyPress(targetKey) {
	// State for keeping track of whether key is pressed
	const [keyPressed, setKeyPressed] = useState(false);
	// If pressed key is our target key then set to true
	function downHandler({ key }) {
		if (key === targetKey) {
			setKeyPressed(true);
		}
	}
	// If released key is our target key then set to false
	const upHandler = ({ key }) => {
		if (key === targetKey) {
			setKeyPressed(false);
		}
	};
	// Add event listeners
	useEffect(() => {
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);
		// Remove event listeners on cleanup
		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, []); // Empty array ensures that effect is only run on mount and unmount
	return keyPressed;
}

const colorMap = [
	{ color: 'blue', background: 'cyan' },
	{ color: 'purple', background: 'magenta' },
	{ color: 'green', background: 'lime' },
	{ color: 'orange', background: 'yellow' },
	{ color: 'grey', background: 'gainsboro' },
	{ color: 'goldenrod', background: 'khaki' },
	{ color: 'olive', background: 'palegreen' },
];

const map_str = `^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$`;
const map = `###############
  #.|.|.|.#.|.|.#
  #-###-###-#-#-#
  #.|.#.|.|.#.#.#
  #-#########-#-#
  #.#.|.|.|.|.#.#
  #-#-#########-#
  #.#.#.|X#.|.#.#
  ###-#-###-#-#-#
  #.|.#.#.|.#.|.#
  #-###-#####-###
  #.|.#.|.|.#.#.#
  #-#-#####-#-#-#
  #.#.|.|.|.#.|.#
  ###############`
	.split('\n')
	.map((row) => row.split(''));

const MAX_Y = map.length;
const MAX_X = map[0].length;

const singletonCoords = (() => {
	let cache = new Map();
	return (x, y) => {
		const key = `${x},${y}`;
		if (!cache.has(key)) {
			return cache.set(key, [x, y]);
		}

		return cache.get(key);
	};
})();

const Chip = ({ bg, children }) => (
	<span
		style={{
			background: bg,
			display: 'inline-block',
			width: '10px',
			height: '12px',
		}}
	>
		{children}
	</span>
);

function App() {
	const [marks, setMarks] = useState([]);
	const [ox, setOx] = useState(1);
	const [oy, setOy] = useState(1);

	const up = useKeyPress('ArrowUp');
	const down = useKeyPress('ArrowDown');
	const left = useKeyPress('ArrowLeft');
	const right = useKeyPress('ArrowRight');

	useEffect(() => {
		if (up) {
			setOy((y) => (y - 2 > 0 ? y - 2 : y));
		} else if (down) {
			setOy((y) => (y + 2 < MAX_Y ? y + 2 : y));
		}

		if (left) {
			setOx((x) => (x - 2 > 0 ? x - 2 : x));
		} else if (right) {
			setOx((x) => (x + 2 < MAX_X ? x + 2 : x));
		}
	}, [up, down, left, right]);

	return (
		<div>
			<code>{map_str}</code>
			<br />
			<div style={{ display: 'flex' }}>
				<pre style={{ marginRight: '1em' }}>
					{map.map((row, y) => {
						return row
							.map((char, x) => {
								let markIndex = marks.findIndex(
									(mark) => mark[0] === x && mark[1] === y
								);
								if (x === ox && y === oy) {
									return (
										<span
											style={{
												color: 'red',
												background: 'lightpink',
												boxShadow: '0px 0px 5px red',
												borderRadius: '3px',
											}}
										>
											{char}
										</span>
									);
								} else if (markIndex > -1) {
									return (
										<span style={colorMap[markIndex % colorMap.length]}>
											{char}
										</span>
									);
								} else {
									return char;
								}
							})
							.concat('\n');
					})}
				</pre>
				Stack:
				<ol>
					{marks.map((m, i) => (
						<li>
							<Chip bg={colorMap[i % colorMap.length].background} />
						</li>
					))}
				</ol>
			</div>
			<button
				onClick={() => {
					setMarks((marks) => {
						let unique_marks = [...new Set([...marks, singletonCoords(ox, oy)])];

						return unique_marks;
					});
				}}
			>
				Add mark
			</button>
			<button
				onClick={() => {
					setMarks((marks) => marks.slice(0, -1));
				}}
			>
				Pop mark
			</button>
		</div>
	);
}

export default App;
