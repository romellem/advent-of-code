const marker_regex = /\((\d+)x(\d+)\)/;
const L_PAREN = '(';

const decompress = str => {
    let new_str = '';
    let paren_index;

    do {
        paren_index = str.indexOf(L_PAREN);
        if (paren_index > -1) {
            // Remove part before first marker
            let left = str.slice(0, paren_index);
            str = str.slice(paren_index);

            new_str += left;

            // Get marker info
            let [match, chars, repeat] = marker_regex.exec(str);
            chars = parseInt(chars);
            repeat = parseInt(repeat);

            // Remove marker
            str = str.slice(match.length);

            // Create expansion string
            let expansion_str = str.slice(0, chars);
            let repeated_str = Array(repeat)
                .fill(expansion_str)
                .join('');

            // Add expansion string
            new_str += repeated_str;

            // Remove expansion str from original str
            str = str.slice(expansion_str.length);
        } else {
            new_str += str;
        }
    } while (paren_index > -1);

    return new_str;
};

module.exports = decompress;
