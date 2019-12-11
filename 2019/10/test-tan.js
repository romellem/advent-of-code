const coordToAngle = (x, y) => {
	let deg = (Math.atan2(-y, x) * 180) / Math.PI;

	// Pretty sure this can be simplified with a modulus, but can't see it
	if (deg <= 90 && deg >= 0) {
		deg = Math.abs(deg - 90);
	} else if (deg < 0) {
		deg = Math.abs(deg) + 90;
	} else {
		deg = 450 - deg;
	}

	return deg;
};

const memoizedCoordToAngle = (() => {
	let lookup = {};
	return ([y, x]) => {
		const coord = `${x},${y}`;
		if (lookup[coord] !== undefined) {
			return coord;
		}

		return coordToAngle(x, y);
	};
})();

const pts = [
    [-4,0],[-4,1],[-4,2],[-4,3],[-4,4],
    [-3,4],[-2,4],[-1,4],[0,4],
    [1,4],[2,4],[3,4],[4,4],
    [4,3],[4,2],[4,1],[4,0],
    [4,-1],[4,-2],[4,-3],[4,-4],
    [3,-4],[2,-4],[1,-4],[0,-4],
    [-1,-4],[-2,-4],[-3,-4],[-4,-4],
    [-4,-3],[-4,-2],[-4,-1]
];

for (let pt of pts) {
    console.log(pt, memoizedCoordToAngle(pt));
}