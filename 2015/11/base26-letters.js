const BASE_26_TO_LETTERS = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    '3': 'd',
    '4': 'e',
    '5': 'f',
    '6': 'g',
    '7': 'h',
    '8': 'i',
    '9': 'j',
    a: 'k',
    b: 'l',
    c: 'm',
    d: 'n',
    e: 'o',
    f: 'p',
    g: 'q',
    h: 'r',
    i: 's',
    j: 't',
    k: 'u',
    l: 'v',
    m: 'w',
    n: 'x',
    o: 'y',
    p: 'z',
};

const LETTERS_TO_BASE_26 = {};
Object.keys(BASE_26_TO_LETTERS).forEach(num => {
    let val = BASE_26_TO_LETTERS[num];
    LETTERS_TO_BASE_26[val] = num;
});

const base26ToLetters = num =>
    String(num)
        .split('')
        .map(c => BASE_26_TO_LETTERS[c])
        .join('');

const lettersToBase26 = num =>
    String(num)
        .split('')
        .map(c => LETTERS_TO_BASE_26[c])
        .join('');

module.exports = {
    base26ToLetters,
    lettersToBase26,
};
