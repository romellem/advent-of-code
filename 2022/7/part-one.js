const { input } = require('./input');
// const G = require('generatorics');

class File {
	constructor(name, size) {
		this.name = name;
		this.size = size;
	}

	size() {
		return this.size;
	}
}

class Dir {
	constructor(name, parentDir) {
		this.isDir = true;
		this.parentDir = parentDir;
		this.name = name;
		this.contents = [];
	}

	size() {
		return this.contents.map((v) => v.size()).reduce((a, b) => a + b, 0);
	}
}

const rootDir = new Dir('/', null);
let inLs = false;

input.unshift();

let currentDir = rootDir;
for (let line of input) {
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

let largeOnes = [];
let largeOnesSizes = [];
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
		let size = v.size();
		if (size <= 100000) {
			largeOnes.push(v);
			largeOnesSizes.push(size);
		}
	}
}

console.log(largeOnesSizes.reduce((a, b) => a + b, 0));
