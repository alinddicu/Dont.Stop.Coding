/// <reference path="../../../../typings/knockout.d.ts"/>
/// <reference path="../../../../typings/linq.d.ts"/>

'use strict';

namespace GoL.Drawing {
	import RectangularInfinite2DGrid = Logic.RectangularInfinite2DGrid;

	export class BoardLine {
		public buttonCells: CellButton[];

		constructor(buttonCells: CellButton[]) {
			this.buttonCells = buttonCells;
		}

		public refreshCells(grid: RectangularInfinite2DGrid): void {
			Enumerable.from(this.buttonCells).forEach((cb: CellButton) => cb.refreshCell(grid));
		}
	}
}