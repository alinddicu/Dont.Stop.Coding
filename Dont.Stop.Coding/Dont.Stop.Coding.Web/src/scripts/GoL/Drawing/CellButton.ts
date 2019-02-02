'use strict';

namespace GoL.Drawing {
	import CellState = Logic.CellState;
	import RectangularInfinite2DGrid = Logic.RectangularInfinite2DGrid;

	export class CellButton {

		private aliveCellColor: string;
		private deadCellColor: string;
		public cell: Cell;
		public backColor: KnockoutObservable<string>;
		public width: number;
		public height: number;
		public text: string;

		constructor(x: number, y: number, width: number, height: number, text: string, aliveCellColor: string, deadCellColor: string, state: CellState = CellState.Dead) {
			this.cell = new Cell(x, y, state);
			this.width = width;
			this.height = height;
			this.text = text;
			this.aliveCellColor = aliveCellColor;
			this.deadCellColor = deadCellColor;
			this.backColor = ko.observable(state === CellState.Alive ? aliveCellColor : deadCellColor);
		}

		public cellButtonClick(): void {
			this.cell = this.cell.isAlive()
				? new Cell(this.cell.x, this.cell.y)
				: new Cell(this.cell.x, this.cell.y, CellState.Alive);
			this.refreshBackColor();
		}

		private refreshBackColor(): void {
			this.backColor(this.cell.isAlive() ? this.aliveCellColor : this.deadCellColor);
		}

		public refreshCell(grid: RectangularInfinite2DGrid): void {
			this.cell = grid.get(this.cell.x, this.cell.y);
			this.refreshBackColor();
		}
	}
}