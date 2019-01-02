var parse = require("../../lib/parser");
var should = require("should");

var parseRule = parse.parseRule;
var parse = parse.default;
var RIGHT = 1;
var LEFT = -1;

describe("Parser module", function(){

	describe("The rule parser", function(){
		it("should parse properly basic rules", function(){
			should.deepEqual(parseRule("Q0 0 => Q1 1 RIGHT"), [
				"Q0",
				"0",
				"Q1",
				"1",
				RIGHT
			]);

			should.deepEqual(parseRule("Q1 1 => Q102 0 LEFT"), [
				"Q1",
				"1",
				"Q102",
				"0",
				LEFT
			]);
		});

		it("should not care about whitespaces", function(){
			should.deepEqual(parseRule(" Q0    0 =>Q1  1 RIGHT "), [
				"Q0",
				"0",
				"Q1",
				"1",
				RIGHT
			]);

			should.deepEqual(parseRule(" Q0 0=>Q1  1     LEFT"), [
				"Q0",
				"0",
				"Q1",
				"1",
				LEFT
			]);
		});

		it("should throw if the instruction was not valid", function(){
			(function(){
				parseRule("Q0 0 = Q1 1 LEFT");
			}).should.throw();

			(function(){
				parseRule("Q0 0 => Q1 1 LEFT =>");
			}).should.throw();

			(function(){
				parseRule("Q0 0 <= Q1 1 LEFT");
			}).should.throw();

			(function(){
				parseRule("Q0 0 Q1 1 LEFT");
			}).should.throw();

		});

		it("should throw if the condition was not valid", function(){
			(function(){
				parseRule("Q0 0 1 => Q1 1 LEFT");
			}).should.throw();

			(function(){
				parseRule("Q0 => Q1 1 LEFT");
			}).should.throw();

			(function(){
				parseRule("=> Q1 1 LEFT");
			}).should.throw();
		});

		it("should throw if the transition was not valid", function(){
			(function(){
				parseRule("Q0 0 => Q1 1 LEFT HEHE");
			}).should.throw();

			(function(){
				parseRule("Q0 0 => Q1 1");
			}).should.throw();

			(function(){
				parseRule("Q0 0 => Q1");
			}).should.throw();
		});

		it("should throw if the direction was not ok", function(){
			(function(){
				parseRule("Q0 0 => Q1 1 IZQUIERDA");
			}).should.throw();

			(function(){
				parseRule("Q0 0 => Q1 0 left");
			}).should.throw();

			(function(){
				parseRule("Q0 0 => Q1 0 WRIGHT");
			}).should.throw();
		});


	});

	describe("The code parser", function(){

		it("shouldn't care about empty lines", function(done){
			var code = "Q0 0 => Q1 0 RIGHT \n\
				\n\
				Q1 0 => HALT 0 RIGHT";

			var machine = parse(code);
			var steps = 0;

			machine.on("step", function(){steps++;});
			machine.on("halt", function(){
				steps.should.be.exactly(2);
				done();
			});

			machine.run(10);

		});

		it("shouldn't care about comments", function(done){
			var code = "Q0 0 => Q1 0 RIGHT \n\
				# What's up\n\
				Q1 0 => HALT 0 RIGHT";

			var machine = parse(code);
			var steps = 0;

			machine.on("step", function(){steps++;});
			machine.on("halt", function(){
				steps.should.be.exactly(2);
				done();
			});

			machine.run(10);
		});

		it("should handle inline comments", function(done){
			var code = "Q0 0 => Q1 0 RIGHT # Yo\n\
				Q1 0 => HALT 0 RIGHT";

			var machine = parse(code);
			var steps = 0;

			machine.on("step", function(){steps++;});
			machine.on("halt", function(){
				steps.should.be.exactly(2);
				done();
			});

			machine.run(10);
		});

	});
	


});


