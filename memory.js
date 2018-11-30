module.exports = size => {
	const memory = new Array(size);

	return {
		output: () => memory,
	};
};
