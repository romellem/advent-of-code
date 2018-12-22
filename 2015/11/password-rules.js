const containsIncreasingStraightOfThreeLetters = pwd => {
    if (pwd.length < 3) {
        return false;
    }

    let password_as_charcodes = pwd.split('').map(c => c.charCodeAt());

    for (let i = 0; i < password_as_charcodes.length - 2; i++) {
        let a = password_as_charcodes[i];
        let b = password_as_charcodes[i + 1];
        let c = password_as_charcodes[i + 2];

        if (a + 1 === b && b + 1 === c) {
            return true;
        }
    }

    return false;
};

const avoidsAbiguousLetters = pwd => {
    if (pwd.includes('i')) return false;
    if (pwd.includes('o')) return false;
    if (pwd.includes('l')) return false;

    return true;
};

const containsPairOfRepeatingLetters = pwd => {
    if (pwd.length < 4) {
        return false;
    }

    let pwd_array = pwd.split('');

    let pairs = {};
    for (let i = 0; i < pwd_array.length - 1; i++) {
        let a = pwd_array[i];
        let b = pwd_array[i + 1];

        if (a === b) {
            pairs[a] = true;
            if (Object.keys(pairs).length >= 2) {
                return true;
            }
        }
    }

    return false;
};

const isValid = pwd => {
    return (
        containsIncreasingStraightOfThreeLetters(pwd) &&
        avoidsAbiguousLetters(pwd) &&
        containsPairOfRepeatingLetters(pwd)
    );
};

module.exports = {
    isValid,
    containsIncreasingStraightOfThreeLetters,
    avoidsAbiguousLetters,
    containsPairOfRepeatingLetters,
};
