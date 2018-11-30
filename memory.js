module.exports = size => {
	const cells = new Array(size);
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
	};
};
