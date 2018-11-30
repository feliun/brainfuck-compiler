const SIZE = 100;
const memory = require('./memory')(SIZE);
const expect = require('expect.js');

describe('brainfuck', () => {
	it('returns empty memory when we initialise it', () => {
		const { cells, pointer } = memory.output();
		const output = JSON.stringify(cells);
		const expected = JSON.stringify(new Array(SIZE));
		expect(output).to.eql(expected);
		expect(pointer).to.equal(0);
	});
});
