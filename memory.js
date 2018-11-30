module.exports = size => {
	const cells = new Array(size).fill(0);
	let pointer = 0;
	const loops = new Array(size).fill(null);

	const current = () => cells[pointer];
	const shiftRight = () => {
		pointer++;
	};
	const shiftLeft = () => {
		pointer--;
	};

	return {
		output: () => ({
			cells,
			pointer,
			loops,
		}),
		shiftRight,
		shiftLeft,
		increase: () => {
			cells[pointer]++;
		},
		decrease: () => {
			cells[pointer]--;
		},
		current,
		digest: symbols => {
			const stack = [];
			symbols.forEach((symbol, index) => {
				if (symbol === '[') stack.push(index);
				if (symbol === ']') {
					const counterparty = stack.pop();
					loops[index] = counterparty;
					loops[counterparty] = index;
				}
			});
			if (stack.length !== 0) throw new Error('Loops not matching!');
		},
		initLoop: () => {
			if (current() !== 0) return shiftRight();
			pointer = loops[pointer];
		},
		finishLoop: () => {
			if (current() === 0) return shiftRight();
			pointer = loops[pointer];
		},
	};
};
