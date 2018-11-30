module.exports = size => {
	const cells = new Array(size).fill(0);
	let pointer = 0;

	return {
		output: () => ({
			cells,
			pointer,
		}),
		shiftRight: () => {
			pointer++;
		},
		shiftLeft: () => {
			pointer--;
		},
		increase: () => {
			cells[pointer]++;
		},
		decrease: () => {
			cells[pointer]--;
		},
		current: () => cells[pointer],
	};
};
