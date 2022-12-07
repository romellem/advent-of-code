const { input } = require('./input');
// const G = require('generatorics');

class File {
	constructor(name, size) {
		this.name = name;
		this._size = size;
	}

	size() {
		return this._size;
	}
}

class Dir {
	constructor(name, parentDir) {
		this.isDir = true;
		this.parentDir = parentDir;
		this.name = name;
		this.contents = [];
	}

	size(ignore) {
		if (ignore && ignore === this) {
			return 0;
		}

		return this.contents.map((v) => v.size(ignore)).reduce((a, b) => a + b, 0);
	}
}

const rootDir = new Dir('/', null);
let inLs = false;

input.shift();

let currentDir = rootDir;
for (let line of input) {
	// console.log(line);
	if (line.startsWith('$ cd')) {
		inLs = false;
		let [, dir] = /\$ cd (.+)$/.exec(line);
		if (dir === '/') {
			currentDir = rootDir;
		} else if (dir === '..') {
			currentDir = currentDir.parentDir;
		} else {
			currentDir = currentDir.contents.find((v) => v.isDir && v.name === dir);
		}
	} else if (line.startsWith('$ ls')) {
		inLs = true;
	} else if (inLs) {
		if (line.startsWith('dir ')) {
			let [, dirName] = /dir (.+)$/.exec(line);
			let newDir = new Dir(dirName, currentDir);
			currentDir.contents.push(newDir);
		} else {
			// file
			let [, size, fileName] = /(\d+) (.+)$/.exec(line);
			size = parseInt(size, 10);

			let newFile = new File(fileName, size);
			currentDir.contents.push(newFile);
		}
	} else {
		throw `uhhh ${line}`;
	}
}

let allDirs = [rootDir];
function* walk(dir) {
	for (let c of dir.contents) {
		yield c;
		if (c.isDir) {
			yield* walk(c);
		}
	}
}

for (let v of walk(rootDir)) {
	if (v.isDir) {
		allDirs.push(v);
	}
}

let couldWork = null;
for (let someDir of allDirs) {
	const sizeWithout = rootDir.size(someDir);
	if (70000000 - sizeWithout >= 30000000) {
		if (!couldWork) {
			couldWork = someDir;
		} else {
			if (someDir.size() < couldWork.size()) {
				couldWork = someDir;
			}
		}
	}
}

console.log(couldWork.size());
