module.exports = size => {
	const cells = new Array(size);
	const pointer = 0;

	return {
		output: () => ({
			cells,
			pointer,
		}),
	};
};
