'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x2,
    property = _x3,
    receiver = _x4; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _tapeJs = require('./tape.js');

var _tapeJs2 = _interopRequireDefault(_tapeJs);

var _transitionFunctionJs = require('./transition-function.js');

var _transitionFunctionJs2 = _interopRequireDefault(_transitionFunctionJs);

var _events = require('events');

Object.defineProperty(exports, 'LEFT', {
	enumerable: true,
	get: function get() {
		return _transitionFunctionJs.LEFT;
	}
});
Object.defineProperty(exports, 'RIGHT', {
	enumerable: true,
	get: function get() {
		return _transitionFunctionJs.RIGHT;
	}
});

var TuringMachine = (function (_EventEmitter) {
	function TuringMachine(initState, haltState) {
		_classCallCheck(this, TuringMachine);

		_get(Object.getPrototypeOf(TuringMachine.prototype), 'constructor', this).call(this);

		this.initState = initState;
		this.haltState = haltState;

		this.init();
	}

	_inherits(TuringMachine, _EventEmitter);

	_createClass(TuringMachine, [{
		key: 'init',
		value: function init() {
			// machine components getting ready
			this.tape = new _tapeJs2['default']();
			this.transitionFunction = new _transitionFunctionJs2['default']();

			// machine getting initialized
			this.headPosition = 0;
			this.currentState = this.initState;
			this.running = false;
		}
	}, {
		key: 'addRule',
		value: function addRule(state, readSymbol, newState, writtenSymbol, direction) {
			this.transitionFunction.addRule(state, readSymbol, newState, writtenSymbol, direction);
			this.emit('ruleAdded', [state, readSymbol, newState, writtenSymbol, direction]);
		}
	}, {
		key: 'step',
		value: function step() {
			// if (this.running) {
				// if (!this.computationEnded()) {
					var readSymbol = this.tape.read(this.headPosition);
					try {
						var _transition = this.transition(readSymbol);

						var state = _transition.state;
						var symbol = _transition.symbol;
						var direction = _transition.direction;

						this.currentState = state;
						this.write(symbol);
						// this.emit('step', { writtenSymbol: symbol, headPosition: this.headPosition, state: state });

						this.moveHead(direction);
					} catch (e) {
						this.stop();
						this.emit('error', e);
					}
				// } else {
				// 	this.stop();
				// 	this.emit('halt', this.tape);
				// }
			// }
		}
	}, {
		key: 'run',
		value: function run() {
			var _this2 = this;

			var transitionTime = arguments[0] === undefined ? 100 : arguments[0];

			this.running = true;
			this.interval_id = setInterval(function () {
				if (_this2.running) {
					_this2.step();
				} else {
					clearInterval(_this2.interval_id);
				}
			}, transitionTime);
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.running = false;
		}
	}, {
		key: 'transition',
		value: function transition(readSymbol) {
			return this.transitionFunction.transition(this.currentState, readSymbol);
		}
	}, {
		key: 'moveHead',
		value: function moveHead(direction) {
			if (direction == _transitionFunctionJs.LEFT) {
				this.headPosition -= 1;
			} else {
				this.headPosition += 1;
			}
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.init();
		}
	}, {
		key: 'write',
		value: function write(symbol) {
			this.tape.write(this.headPosition, symbol);
		}
	}, {
		key: 'computationEnded',
		value: function computationEnded() {
			return this.currentState == this.haltState;
		}
	}, {
		key: 'surroundingData',
		value: function surroundingData(size) {
			return this.tape.readBulk(this.headPosition - size, this.headPosition + size);
		}
	}]);

	return TuringMachine;
})(_events.EventEmitter);

exports['default'] = TuringMachine;
//# sourceMappingURL=index.js.map