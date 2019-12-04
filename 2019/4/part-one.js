let count = 0;
for (let n = 138241; n <= 674034; n++) {
	let n_str = String(n);
	let n_arr = n_str.split('').map(v => +v);

	const has_double_digit = /(\d)\1/.test(n_str);
	const all_increasing_digits = n_arr.every((c, i, a) =>
		i === a.length - 1 ? true : c <= a[i + 1]
	);
	if (has_double_digit && all_increasing_digits) {
		count++;
	}
}

console.log(count);
