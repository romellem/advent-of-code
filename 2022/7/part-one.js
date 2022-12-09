const { input } = require('./input');
const { Filesystem } = require('./filesystem');

const drive = new Filesystem(input);

let smallDirsSum = 0;
for (let item of drive) {
	if (item.isDir) {
		let size = item.size();
		if (size <= 100000) {
			smallDirsSum += size;
		}
	}
}

console.log(smallDirsSum);
