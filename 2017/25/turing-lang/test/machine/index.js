var should = require("should");
var tm = require("../../lib/machine");

var Machine = tm.default;
var LEFT = tm.LEFT;
var RIGHT = tm.RIGHT;

describe("A turing machine", function(){
	var Q0 = 0,
		Q1 = 1,
		Q2 = 2,
		Q3 = 3,
		HALT = -1;
	
	var machine = new Machine(Q0, HALT);

	it("halts in finite time with a not looping program", function(done){
		machine.addRule(Q0, 0, Q1, 1, RIGHT);
		machine.addRule(Q1, 0, HALT, 0, RIGHT);

		machine.once("halt", function(){
			done();
		});

		machine.run(10);
	});

	it("emits step events", function(done){
		machine.reset();
		machine.addRule(Q0, 0, Q1, 1, RIGHT);
		machine.addRule(Q1, 0, Q2, 0, LEFT);
		machine.addRule(Q2, 1, HALT, 0, RIGHT);

		var steps_called = 0;

		machine.on("step", function(){ steps_called++; });

		machine.once("halt", function() {
			steps_called.should.be.exactly(3);
			done();
		});

		machine.run(10);

	});

	it("emits error events", function(done){
		machine.reset();
		machine.removeAllListeners("step");

		machine.addRule(Q0, 0, Q1, 0, RIGHT);	// we do not define any rule for the next step

		var steps_done = 0;
		machine.on("step", function(){ steps_done++; });

		machine.once("error", function(){
			steps_done.should.be.exactly(1);
			done();
		});

		machine.run(10);
	});

	it("emits rules events", function(done){
		machine.reset();
		machine.removeAllListeners("step");
		machine.once("ruleAdded", function(){
			done();
		});

		machine.addRule(Q0, 0, Q1, 1, LEFT);
	});

	it("writes data properly", function(done){
		machine.reset();
		machine.removeAllListeners("steps");

		machine.addRule(Q0, 0, Q1, 1, RIGHT);
		machine.addRule(Q1, 0, Q2, 1, RIGHT);
		machine.addRule(Q2, 0, Q1, 1, LEFT);
		machine.addRule(Q1, 1, HALT, 0, LEFT);

		var steps_done = 0;
		
		machine.on("step", function(data){
			var tape = machine.tape;
			switch(steps_done){
				case 0:
					tape.read(0).should.be.exactly(1);
					break;
				case 1:
					tape.read(1).should.be.exactly(1);
					break;
				case 2:
					tape.read(2).should.be.exactly(1);
					break;
				case 3:
					tape.read(1).should.be.exactly(0);
					break;
			}

			steps_done++;
		});

		machine.once("halt", function(){
			steps_done.should.be.exactly(4);
			done();
		});

		machine.run(10);

	});
	
});