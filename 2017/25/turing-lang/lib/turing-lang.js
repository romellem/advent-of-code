'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _machine = require('./machine');

var _machine2 = _interopRequireDefault(_machine);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

exports.Machine = _machine2['default'];
exports.RIGHT = _machine.RIGHT;
exports.LEFT = _machine.LEFT;
exports.parse = _parser2['default'];
//# sourceMappingURL=turing-lang.js.map