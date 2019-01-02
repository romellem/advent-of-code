turing-lang
=============
![Travis CI](https://magnum.travis-ci.com/BraulioVM/turing-lang.svg?token=qKkPGCZvRdJvJ693qC2L)
> Ever wanted to use Turing Machines in your javascript project?

````turing-lang```` is a javascript module that lets you run Turing Machines in your project. You can use it both 
from node and from the browser.

### lang
A ````turing-lang```` program describes the transition function of a Turing Machine. That's why any instruction in this language looks like this:
````
CURRENT_STATE READ_SYMBOL => NEXT_STATE WRITTEN_SYMBOL [LEFT | RIGHT]
````

The initial state of your program will be Q0, and HALT will be the halt state. Therefore, the 3-state busy beaver machine will be:
````
Q0 0 => Q1 1 RIGHT
Q0 1 => HALT 1 RIGHT # ends the program

Q1 0 => Q2 0 RIGHT
Q1 1 => Q1 1 RIGHT

Q2 0 =>	Q2 1 LEFT
Q2 1 => Q0 1 LEFT
````

Have in mind that the default symbol for ````turing-lang```` Turing Machine is always 0.

### API
*Coming soon*



### Development
To contribute to the project, clone the repo and run:
````
$> npm install 
$> grunt test
````
Make sure you have grunt-cli installed.