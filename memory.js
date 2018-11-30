module.exports = size => {
	const cells = new Array(size).fill(0);
	let pointer = 0;
	const loops = new Array(size).fill(null);

	return {
		output: () => ({
			cells,
			pointer,
			loops,
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
	};
};
