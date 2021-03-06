﻿/// <reference path="../../../../typings/linq.d.ts"/>

'use strict';

namespace GameOfLife.Logic {
	export class RectangularInfinite2DGrid {
		public cells: Cell[] = [];

		constructor(cells: Cell[]) {
			this.clean();
			for (let i = 0; i < cells.length; i++) {
				this.cells.push(cells[i]);
			}
		}

		public discover(): void {
			Enumerable.from(this.cells)
				.selectMany((cell: Cell) => this.getNeighbours(cell))
				.where((cell: Cell) => !Enumerable.from(this.cells).contains(cell))
				.distinct()
				.forEach((cell: Cell) => this.cells.push(cell));
		}

		private uniqueCells(cells: Cell[]) {
			const dictionary: any = {};
			for (let i = 0; i < cells.length; i++) {
				const cell = cells[i];
				dictionary[cell.toString()] = cell;
			}

			const newDisctinctCells: Cell[] = [];
			for (let key in dictionary) {
				newDisctinctCells.push(dictionary[key]);
			}

			return newDisctinctCells;
		}

		public getNeighbours(cell: Cell): Cell[] {
			let neighbours: Cell[] = [];
			neighbours.push(this.get(cell.x - 1, cell.y - 1));
			neighbours.push(this.get(cell.x, cell.y - 1));
			neighbours.push(this.get(cell.x + 1, cell.y - 1));
			neighbours.push(this.get(cell.x + 1, cell.y));
			neighbours.push(this.get(cell.x + 1, cell.y + 1));
			neighbours.push(this.get(cell.x, cell.y + 1));
			neighbours.push(this.get(cell.x - 1, cell.y + 1));
			neighbours.push(this.get(cell.x - 1, cell.y));

			neighbours = this.uniqueCells(neighbours);

			return neighbours;
		}

		public get(x: number, y: number): Cell {
			//console.log(`x: ${x}, y: ${y}`);
			//console.log(this.Cells);
			this.cells = this.uniqueCells(this.cells);
			const foundCell = Enumerable.from(this.cells).singleOrDefault((c: Cell) => c.x === x && c.y === y);
			return foundCell ? foundCell : new Cell(x, y);
		}

		public clean(): void {
			const isolatedCells = Enumerable.from(this.cells)
				.where((cell: Cell) => Enumerable.from(this.getNeighbours(cell)).all((n: Cell) => !n.isAlive()))
				.toArray();

			for (let i = 0; i < isolatedCells.length; i++) {
				const isolatedCell: Cell = isolatedCells[i];
				for (let j = 0; j < this.cells.length; j++) {
					const cell = this.cells[j];
					if (Cell.equals(isolatedCell, cell)) {
						this.cells.splice(j, 1);
					}
				}
			}
			//Enumerable.from(this.Cells).removeAllRanges((c: Cell) => Enumerable.from(isolatedCells).contains(c));
		}

		//public override string ToString()
		//{
		//    return string.Join(", ", _cells.Where(c => c.IsAlive()));
		//}
	}
}
