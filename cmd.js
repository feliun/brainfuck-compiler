module.exports = target => symbol => {
	const dictionary = {
		'>': target.shiftRight,
		'<': target.shiftLeft,
		'+': target.increase,
		'-': target.decrease,
		'.': target.current,
		'[': target.initLoop,
		']': target.finishLoop,
	};

	const handler = dictionary[symbol];
	if (!handler) throw new Error('Non found!');
	return handler();
};
