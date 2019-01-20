/// <reference path="../../../../typings/linq.d.ts"/>

'use strict';

namespace GoL.Logic {
	import Cell = Gol.Logic.Cell;

	export class Cycle {
		public Run(currentGrid: RectangularInfinite2DGrid): RectangularInfinite2DGrid {
			const newGrid: RectangularInfinite2DGrid = this.InitializeNewGrid(currentGrid);

			this.ComputeAndCompleteMutation(newGrid);

			this.PrepareForNextCycle(newGrid);

			return newGrid;
		}

		private InitializeNewGrid(currentGrid: RectangularInfinite2DGrid): RectangularInfinite2DGrid {
			const cells: Cell[] = Enumerable.from(currentGrid.cells).select((c: Cell) => new Cell(c.x, c.y, c.state)).toArray();
			const newGrid = new RectangularInfinite2DGrid(cells);
			newGrid.discover();
			return newGrid;
		}

		private ComputeAndCompleteMutation(newGrid: RectangularInfinite2DGrid): void {
			Enumerable.from(newGrid.cells).forEach((cell: Cell) => cell.computeNextMutation(Enumerable.from(newGrid.getNeighbours(cell)).count((c: Cell) => c.isAlive())));
			Enumerable.from(newGrid.cells).forEach((cell: Cell) => cell.completeMutation());
		}

		private PrepareForNextCycle(newGrid: RectangularInfinite2DGrid): void {
			newGrid.discover();
			newGrid.clean();
		}
	}
}
