const { input } = require('./input');
const { Filesystem } = require('./filesystem');

const drive = new Filesystem(input);
const dirs = [...drive].filter((v) => v.isDir);

let smallDirsSum = 0;
for (let item of dirs) {
	let size = item.size();
	if (size <= 100000) {
		smallDirsSum += size;
	}
}

console.log(smallDirsSum);
