const isRoomValid = ({ name, id, checksum } = {}) => {
    let letters = name.split('').filter(c => c !== '-');
    let letter_counts = {};
    letters.forEach(c => {
        if (!letter_counts[c]) {
            letter_counts[c] = 0;
        }

        letter_counts[c] += 1;
    });

    let letters_sorted = Object.entries(letter_counts);
    letters_sorted.sort(([a_char, a_count], [b_char, b_count]) => {
        if (a_count > b_count) return -1;
        else if (a_count < b_count) return 1;
        else {
            if (a_char < b_char) return -1;
            else if (a_char > b_char) return 1;
            else return 0;
        }
    });

    let top_five = letters_sorted
        .map(a => a[0])
        .slice(0, 5)
        .join('');

    return checksum === top_five;
};

module.exports = isRoomValid;
