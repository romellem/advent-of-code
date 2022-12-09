const { input } = require('./input');
const { Filesystem, File } = require('./filesystem');

const drive = new Filesystem(input);
const dirs = [...drive].filter((v) => v.isDir);

let couldWork = new File('dummy', Number.MAX_VALUE);
for (let someDir of dirs) {
	const sizeWithout = drive.size(someDir);
	if (70000000 - sizeWithout >= 30000000) {
		if (someDir.size() < couldWork.size()) {
			couldWork = someDir;
		}
	}
}

console.log(couldWork.size());
