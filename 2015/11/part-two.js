const input = require('./input');
const { base26ToLetters, lettersToBase26 } = require('./base26-letters');
const { isValid } = require('./password-rules');

let next_password = input;

// Find the next 2nd password
for (let i = 0; i < 2; i++) {
    do {
        next_password = base26ToLetters(
            (parseInt(lettersToBase26(next_password), 26) + 1).toString(26)
        );
    } while (!isValid(next_password));
}

console.log(next_password);
