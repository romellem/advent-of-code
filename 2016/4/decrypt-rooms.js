const LETTERS = {};
'abcdefghijklmnopqrstuvwxyz'.split('').forEach(char => {
    LETTERS[char.charCodeAt() - 'a'.charCodeAt()] = char;
});

const decryptRoom = ({ name, id, checksum } = {}) => {
    let shifted_name = name
        .split('')
        .map(c => {
            if (c === '-') {
                return ' ';
            }

            let new_char_num = (c.charCodeAt() - 'a'.charCodeAt() + id) % 26;
            return LETTERS[new_char_num];
        })
        .join('');

    return { name, id, checksum, decryptedName: shifted_name };
};

module.exports = decryptRoom;
