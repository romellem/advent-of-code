var should = require("should");
var tf = require("../../lib/machine/transition-function");

var TransitionFunction = tf.default;
var RuleNotFoundException = tf.RuleNotFoundException;
var LEFT = tf.LEFT;
var RIGHT = tf.RIGHT;

describe("The transition function", function(){

	var tf = new TransitionFunction();
	var Q0 = 0,
		Q1 = 1;

	it("should insert new rules", function(){
		tf.addRule(Q0, 0, Q1, 1, LEFT);
		tf.addRule(Q1, 0, Q0, 0, RIGHT);

		should.deepEqual(tf.transition(Q0, 0), {
			state: Q1,
			symbol: 1,
			direction: LEFT
		});

		should.deepEqual(tf.transition(Q1, 0), {
			state: Q0,
			symbol: 0,
			direction: RIGHT
		});


	});

	it("should throw exception if a not-existant rule was asked", function(){
		tf.transition.bind(tf, Q0, 1).should.throw();
		tf.transition.bind(tf, Q1, 10).should.throw();
	});

	it("can get reset", function(){
		tf.reset();
		tf.transition.bind(tf, Q0, 0).should.throw();
		tf.transition.bind(tf, Q1, 0).should.throw();
	});


});