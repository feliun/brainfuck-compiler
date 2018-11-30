module.exports = target => symbol => {
	switch (symbol) {
		case '>':
			target.shiftRight();
			break;

		default:
			break;
	}
};
