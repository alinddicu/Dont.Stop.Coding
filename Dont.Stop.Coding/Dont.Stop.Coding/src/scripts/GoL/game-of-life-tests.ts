/// <reference path="../../../typings/linq.d.ts"/>
'use strict';
import Cell = Gol.Logic.Cell;

function assertArrays(expectedArray: any[], checkedArray: any[]) {
	for (let i = 0; i < expectedArray.length; i++) {
		const expected = expectedArray[i];
		const checked = checkedArray[i];
		if (expected !== checked) {
			throw `expected '${expected}' different than '${checked}' at ${i}`;
		}
	}
}

function test5Star() {
	const cells = [
		new Cell(5, 5, GoL.Logic.CellState.Alive),
		new Cell(5, 4, GoL.Logic.CellState.Alive),
		new Cell(4, 5, GoL.Logic.CellState.Alive),
		new Cell(5, 6, GoL.Logic.CellState.Alive),
		new Cell(6, 5, GoL.Logic.CellState.Alive)
	];

	let grid = new GoL.Logic.RectangularInfinite2DGrid(cells);
	const cycle = new GoL.Logic.Cycle();
	const intermediateGridWithAliveCellsStrings: string[] = [];
	for (let i = 0; i < 9; i++) {
		grid = cycle.Run(grid);
		const toString = Enumerable.from(grid.cells).where((cell: Cell) => cell.isAlive()).toArray() + "";
		intermediateGridWithAliveCellsStrings.push(toString);
	}

	const expectedIntermediateGridWithAliveCellsStrings: string[] = [
		"{\"x\":5,\"y\":4},{\"x\":4,\"y\":5},{\"x\":5,\"y\":6},{\"x\":6,\"y\":5},{\"x\":4,\"y\":4},{\"x\":6,\"y\":4},{\"x\":6,\"y\":6},{\"x\":4,\"y\":6}",
		"{\"x\":4,\"y\":4},{\"x\":6,\"y\":4},{\"x\":6,\"y\":6},{\"x\":4,\"y\":6},{\"x\":5,\"y\":3},{\"x\":3,\"y\":5},{\"x\":5,\"y\":7},{\"x\":7,\"y\":5}",
		"{\"x\":5,\"y\":4},{\"x\":4,\"y\":5},{\"x\":5,\"y\":6},{\"x\":6,\"y\":5},{\"x\":4,\"y\":4},{\"x\":6,\"y\":4},{\"x\":6,\"y\":6},{\"x\":4,\"y\":6},{\"x\":5,\"y\":3},{\"x\":3,\"y\":5},{\"x\":5,\"y\":7},{\"x\":7,\"y\":5}",
		"{\"x\":4,\"y\":3},{\"x\":5,\"y\":3},{\"x\":6,\"y\":3},{\"x\":3,\"y\":4},{\"x\":3,\"y\":6},{\"x\":3,\"y\":5},{\"x\":6,\"y\":7},{\"x\":5,\"y\":7},{\"x\":4,\"y\":7},{\"x\":7,\"y\":4},{\"x\":7,\"y\":5},{\"x\":7,\"y\":6}",
		"{\"x\":5,\"y\":4},{\"x\":4,\"y\":5},{\"x\":5,\"y\":6},{\"x\":6,\"y\":5},{\"x\":4,\"y\":3},{\"x\":5,\"y\":3},{\"x\":6,\"y\":3},{\"x\":3,\"y\":4},{\"x\":3,\"y\":6},{\"x\":3,\"y\":5},{\"x\":6,\"y\":7},{\"x\":5,\"y\":7},{\"x\":4,\"y\":7},{\"x\":7,\"y\":4},{\"x\":7,\"y\":5},{\"x\":7,\"y\":6},{\"x\":5,\"y\":2},{\"x\":2,\"y\":5},{\"x\":5,\"y\":8},{\"x\":8,\"y\":5}",
		"{\"x\":4,\"y\":2},{\"x\":5,\"y\":2},{\"x\":6,\"y\":2},{\"x\":2,\"y\":5},{\"x\":2,\"y\":4},{\"x\":2,\"y\":6},{\"x\":6,\"y\":8},{\"x\":5,\"y\":8},{\"x\":4,\"y\":8},{\"x\":8,\"y\":4},{\"x\":8,\"y\":5},{\"x\":8,\"y\":6}",
		"{\"x\":5,\"y\":3},{\"x\":3,\"y\":5},{\"x\":5,\"y\":7},{\"x\":7,\"y\":5},{\"x\":5,\"y\":2},{\"x\":2,\"y\":5},{\"x\":5,\"y\":8},{\"x\":8,\"y\":5},{\"x\":5,\"y\":1},{\"x\":1,\"y\":5},{\"x\":5,\"y\":9},{\"x\":9,\"y\":5}",
		"{\"x\":4,\"y\":2},{\"x\":5,\"y\":2},{\"x\":6,\"y\":2},{\"x\":2,\"y\":5},{\"x\":2,\"y\":4},{\"x\":2,\"y\":6},{\"x\":6,\"y\":8},{\"x\":5,\"y\":8},{\"x\":4,\"y\":8},{\"x\":8,\"y\":4},{\"x\":8,\"y\":5},{\"x\":8,\"y\":6}",
		"{\"x\":5,\"y\":3},{\"x\":3,\"y\":5},{\"x\":5,\"y\":7},{\"x\":7,\"y\":5},{\"x\":5,\"y\":2},{\"x\":2,\"y\":5},{\"x\":5,\"y\":8},{\"x\":8,\"y\":5},{\"x\":5,\"y\":1},{\"x\":1,\"y\":5},{\"x\":5,\"y\":9},{\"x\":9,\"y\":5}"
	];

	assertArrays(intermediateGridWithAliveCellsStrings, expectedIntermediateGridWithAliveCellsStrings);
}

test5Star();