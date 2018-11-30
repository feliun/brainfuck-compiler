module.exports = target => symbol => {
	const dictionary = {
		'>': target.shiftRight,
		'<': target.shiftLeft,
	};

	const handler = dictionary[symbol];
	if (!handler) throw new Error('Non found!');
	return handler();
};
