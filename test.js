const SIZE = 10;
const initMemory = require('./memory');
const initCommand = require('./cmd');
const expect = require('expect.js');

describe('brainfuck', () => {
	let memory;
	let cmd;

	const compareCells = (current, expected) => {
		expect(JSON.stringify(current)).to.eql(JSON.stringify(expected));
	};

	const createArray = () => new Array(SIZE).fill(0);

	beforeEach(() => {
		memory = initMemory(SIZE);
		cmd = initCommand(memory);
	});

	it('returns empty memory when we initialise it', () => {
		const { cells, pointer } = memory.output();

		compareCells(cells, createArray());
		expect(pointer).to.equal(0);
	});

	it('returns 1 when we shift to the right', () => {
		cmd('>');
		const { cells, pointer } = memory.output();

		compareCells(cells, createArray());
		expect(pointer).to.equal(1);
	});

	it('shifts to the left', () => {
		cmd('>');
		cmd('>');
		cmd('<');
		const { cells, pointer } = memory.output();

		compareCells(cells, createArray());
		expect(pointer).to.equal(1);
	});

	it('increase the cell value', () => {
		cmd('+');

		const { cells, pointer } = memory.output();

		compareCells(cells, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		expect(pointer).to.equal(0);
	});
});
