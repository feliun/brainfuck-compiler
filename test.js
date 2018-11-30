const SIZE = 100;
const memory = require('./memory')(SIZE);
const expect = require('expect.js');

describe('brainfuck', () => {
	it('returns empty memory when we initialise it', () => {
		const output = JSON.stringify(memory.output());
		const expected = JSON.stringify(new Array(SIZE));
		expect(output).to.eql(expected);
	});
});
