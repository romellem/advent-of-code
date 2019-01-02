"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tape = (function () {
	function Tape() {
		_classCallCheck(this, Tape);

		this.initTape();
	}

	_createClass(Tape, [{
		key: "initTape",
		value: function initTape() {
			this.minimumIndexWritten = 0;
			this.maximumIndexWritten = 0;
			this.data = {};
		}
	}, {
		key: "read",
		value: function read(i) {
			if (this.data[i]) {
				return this.data[i];
			} else {
				return 0; // the default symbol
			}
		}
	}, {
		key: "readBulk",
		value: function readBulk(i, j) {
			var _this = this;

			var result = {}; // This will allow negative indexes
			range(i, j).forEach(function (k) {
				result[k] = _this.read(k);
			});

			return result;
		}
	}, {
		key: "write",
		value: function write(i, symbol) {
			this.minimumIndexWritten = Math.min(this.minimumIndexWritten, i);
			this.maximumIndexWritten = Math.max(this.maximumIndexWritten, i);

			this.data[i] = symbol;
		}
	}, {
		key: "reset",
		value: function reset() {
			this.initTape();
		}
	}, {
		key: "accesedTape",
		value: function accesedTape() {
			return this.readBulk(this.minimumIndexWritten, this.maximumIndexWritten);
		}
	}]);

	return Tape;
})();

exports["default"] = Tape;

function range(i, j) {
	var result = [];

	for (var k = i; k < j; k++) {
		result.push(k);
	}

	return result;
}
module.exports = exports["default"];
//# sourceMappingURL=tape.js.map