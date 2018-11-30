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

	const invoke = commands => ({
		run: () => {
			memory.digest(commands);
			return commands.reduce((total, symbol) => total.concat(cmd(symbol)), []);
		},
	});

	const createArray = () => new Array(SIZE).fill(0);

	beforeEach(() => {
		memory = initMemory(SIZE);
		cmd = initCommand(memory);
	});

	it('returns empty memory when we initialise it', () => {
		const { cells, pointer, loops } = memory.output();

		compareCells(cells, createArray());
		expect(pointer).to.equal(0);
		expect(loops).to.eql(new Array(SIZE).fill(null));
	});

	it('returns 1 when we shift to the right', () => {
		const commands = ['>'];
		invoke(commands).run();
		const { cells, pointer, loops } = memory.output();

		compareCells(cells, createArray());
		expect(loops).to.eql(new Array(SIZE).fill(null));
		expect(pointer).to.equal(1);
	});

	it('shifts to the left', () => {
		const commands = ['>', '>', '<'];
		invoke(commands).run();
		const { cells, pointer } = memory.output();

		compareCells(cells, createArray());
		expect(pointer).to.equal(1);
	});

	it('increase the cell value', () => {
		const commands = ['+'];
		invoke(commands).run();

		const { cells, pointer } = memory.output();

		compareCells(cells, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		expect(pointer).to.equal(0);
	});

	it('decreases the cell value like a boss', () => {
		const commands = ['+', '+', '>', '>', '+', '+', '>', '<', '-'];
		invoke(commands).run();

		const { cells, pointer } = memory.output();

		compareCells(cells, [2, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
		expect(pointer).to.equal(2);
	});

	it('returns current value', () => {
		const commands = ['+', '+', '>', '>', '+', '+', '>', '<', '-', '.'];
		const result = invoke(commands).run();
		const [current] = result.slice(-1);

		const { cells, pointer } = memory.output();

		compareCells(cells, [2, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
		expect(pointer).to.equal(2);
		expect(current).to.equal(1);
	});

	it('parses loop information', () => {
		const commands = ['[', '+', '>', '[', '+', '+', ']', '<', ']', '.'];
		const result = invoke(commands).run();

		const { loops } = memory.output();

		compareCells(loops, [8, null, null, 6, null, null, 3, null, 0, null]);
	});
});
