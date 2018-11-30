const SIZE = 100;
const initMemory = require('./memory');
const initCommand = require('./cmd');
const expect = require('expect.js');

describe('brainfuck', () => {
	let memory;
	let cmd;

	const compareCells = (current, expected) => {
		expect(JSON.stringify(current)).to.eql(JSON.stringify(expected));
	};

	beforeEach(() => {
		memory = initMemory(SIZE);
		cmd = initCommand(memory);
	});

	it('returns empty memory when we initialise it', () => {
		const { cells, pointer } = memory.output();

		compareCells(cells, new Array(SIZE));
		expect(pointer).to.equal(0);
	});

	it('returns 1 when we shift to the right', () => {
		cmd('>');
		const { cells, pointer } = memory.output();

		compareCells(cells, new Array(SIZE));
		expect(pointer).to.equal(1);
	});

	it('shifts to the left', () => {
		cmd('>');
		cmd('>');
		cmd('<');
		const { cells, pointer } = memory.output();

		compareCells(cells, new Array(SIZE));
		expect(pointer).to.equal(1);
	});
});
