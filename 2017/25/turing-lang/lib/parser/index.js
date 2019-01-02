"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.parseRule = parseRule;
exports["default"] = parse;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _machine = require("../machine");

var _machine2 = _interopRequireDefault(_machine);

var SyntaxError = (function (_Error) {
	function SyntaxError(message, line) {
		_classCallCheck(this, SyntaxError);

		_get(Object.getPrototypeOf(SyntaxError.prototype), "constructor", this).call(this);
		this.message = message;
		this.line = line;
	}

	_inherits(SyntaxError, _Error);

	return SyntaxError;
})(Error);

exports.SyntaxError = SyntaxError;

function parseRule(line) {
	var _extractRuleParts = extractRuleParts(line);

	var _extractRuleParts2 = _slicedToArray(_extractRuleParts, 2);

	var condition = _extractRuleParts2[0];
	var transition = _extractRuleParts2[1];

	var _extractCondition = extractCondition(condition);

	var _extractCondition2 = _slicedToArray(_extractCondition, 2);

	var originState = _extractCondition2[0];
	var readSymbol = _extractCondition2[1];

	var _extractTransition = extractTransition(transition);

	var _extractTransition2 = _slicedToArray(_extractTransition, 3);

	var nextState = _extractTransition2[0];
	var symbolToWrite = _extractTransition2[1];
	var direction = _extractTransition2[2];

	return [originState, readSymbol, nextState, symbolToWrite, direction];
}

function parse(code) {
	var machine = new _machine2["default"]("Q0", "HALT");
	var rules = getRulesFromCode(code);

	rules.forEach(function (rule) {
		var machine_rule = parseRule(rule);
		machine.addRule.apply(machine, _toConsumableArray(machine_rule));
	});

	return machine;
}

function getRulesFromCode(code) {
	code = code.split("\t").join(" "); // Replace tabs with spaces
	code = stripComments(code);

	var lines = code.split("\n");
	return lines.filter(notEmpty);
}

function stripComments(code) {
	var lines = code.split("\n");
	var result_lines = [];

	lines.forEach(function (line) {
		result_lines.push(line.split("#")[0]);
	});

	return result_lines.join("\n");
}

function notEmpty(line) {
	var parts = line.split(" ");
	var notEmptyParts = parts.filter(function (part) {
		return part.length !== 0;
	});
	return notEmptyParts.length > 0;
}

function extractRuleParts(rule) {
	var ruleParts = rule.split("=>");

	if (ruleParts.length !== 2) {
		throw new SyntaxError("Instruction error: " + rule, rule);
	}

	return ruleParts;
}

function extractCondition(conditionPart) {
	var conditionParts = conditionPart.split(" ").filter(notEmpty);

	if (conditionParts.length !== 2) {
		throw new SyntaxError("Rule Condition Error", line);
	}

	return conditionParts;
}

function extractTransition(transitionPart) {
	var transitionParts = transitionPart.split(" ").filter(notEmpty);

	if (transitionParts.length !== 3) {
		throw new SyntaxError("Rule transition Error", transitionPart);
	}

	transitionParts[2] = extractDirection(transitionParts[2]);

	return transitionParts;
}

function extractDirection(direction) {
	if (direction === "LEFT") {
		return _machine.LEFT;
	} else if (direction === "RIGHT") {
		return _machine.RIGHT;
	}

	throw new SyntaxError("Rule direction error", direction);
}
//# sourceMappingURL=index.js.map