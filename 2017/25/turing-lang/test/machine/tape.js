var should = require('should');
var Tape = require("../../lib/machine/tape.js");

describe("The tape", function(){

	var tape = new Tape();

	it("should have zeros when started", function(){
		tape.read(0).should.be.exactly(0);
		tape.read(1).should.be.exactly(0);
		tape.read(-27).should.be.exactly(0);
	});

	it("should be writable", function(){
		tape.write(0, 1);	
		tape.write(1, 20);
		tape.write(-1, "test");

		tape.read(0).should.be.exactly(1);
		tape.read(1).should.be.exactly(20);
		tape.read(-1).should.be.exactly("test");
	});

	it("should be bulk readable", function(){

		var result1 = {};
		result1[-2] = 0;
		result1[-1] = "test";
		result1[0] = 1;
		result1[1] = 20;
		should.deepEqual(tape.readBulk(-2, 2), result1);


		var result2 = {};
		result2[5] = 0;
		result2[6] = 0;
		should.deepEqual(tape.readBulk(5, 7), result2);

	});

	it("should update minimumIndexWritten and maxIndexWritten", function(){
		tape.minimumIndexWritten.should.be.exactly(-1);
		tape.maximumIndexWritten.should.be.exactly(1);
	});

	it("should reset ok", function(){
		tape.reset();

		tape.read(0).should.be.exactly(0);
		tape.read(1).should.be.exactly(0);
		tape.read(-1).should.be.exactly(0);
		tape.read(-80).should.be.exactly(0);

		tape.minimumIndexWritten.should.be.exactly(0);
		tape.maximumIndexWritten.should.be.exactly(0);

	});



});