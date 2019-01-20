/// <reference path="../../../../typings/knockout.d.ts"/>
/// <reference path="../../../../typings/linq.d.ts"/>

'use strict';

namespace GoL.Drawing {
	import Cycle = Logic.Cycle;
	import RectangularInfinite2DGrid = Logic.RectangularInfinite2DGrid;
	import CellState = Logic.CellState;

	export class Board {

		private importedCells: Cell[] = [];
		private options: IGoLOptions;
		private playIntervalId: number;
		private cycle = new Cycle();
		private gridHistory: RectangularInfinite2DGrid[] = [];
		public boardLines: KnockoutObservableArray<BoardLine> = ko.observableArray([]);
		public isEnabled: KnockoutObservable<boolean> = ko.observable(true);
		public isPlaying: KnockoutObservable<boolean> = ko.observable(false);
		public isPausing: KnockoutObservable<boolean> = ko.observable(false);

		constructor(goLOptions: IGoLOptions) {
			this.options = goLOptions;
			this.initCellButtonsInSquare(goLOptions);
		}

		private setIsPlayingIsPausing(isPlaying: boolean, isPausing: boolean): void {
			this.isPlaying(isPlaying);
			this.isPausing(isPausing);
		}

		public initCellButtonsInSquare(goLOptions: IGoLOptions): void {

			this.options = goLOptions;
			this.boardLines([]);
			const cellsPerRow = goLOptions.cellsPerRow;
			for (let hCounter = 0; hCounter < cellsPerRow; hCounter++) {
				const buttonCells: CellButton[] = [];
				for (let vCounter = 0; vCounter < cellsPerRow; vCounter++) {
					const cellButton = this.createCellButton(vCounter, hCounter);
					buttonCells.push(cellButton);
				}

				this.boardLines.push(new BoardLine(buttonCells));
			}
		}

		private createCellButton(vCounter: number, hCounter: number): CellButton {
			const text = Board.getCellText(vCounter, hCounter, this.options.isShowCellsCoordinates);
			const buttonWidth = this.options.cellSize;
			return new CellButton(vCounter, hCounter, buttonWidth, buttonWidth, text,
				this.options.aliveCellColor, this.options.deadCellColor, this.getCellStateFromImported(vCounter, hCounter));
		}

		private static getCellText(vCounter: number, hCounter: number, isShowCellsCoordinates: boolean): string {
			return isShowCellsCoordinates ? `(${vCounter},${hCounter})` : "";
		}

		private getAliveCells(): Cell[] {
			return Enumerable.from(this.boardLines())
				.selectMany((bl: BoardLine) => bl.buttonCells)
				.where((cb: CellButton) => cb.cell.isAlive())
				.select((cb: CellButton) => cb.cell).toArray();
		}

		private getCurrentGrid(): RectangularInfinite2DGrid {
			return new RectangularInfinite2DGrid(this.getAliveCells());
		}

		private refreshCellButtons(): void {
			Enumerable.from(this.boardLines()).forEach((b: BoardLine) => b.refreshCells(this.getLastGrid()));
		}

		private getLastGrid(): RectangularInfinite2DGrid {
			return this.gridHistory[this.gridHistory.length - 1];
		}

		public skipToNext(): void {
			this.isEnabled(false);
			if (this.gridHistory.length === 0) {
				this.gridHistory.push(this.getCurrentGrid());
			}

			this.gridHistory.push(this.cycle.Run(this.getLastGrid()));
			this.refreshCellButtons();
		}

		public reset(): void {
			this.stopAction();
			this.setIsPlayingIsPausing(false, false);
			this.isEnabled(true);
			this.initCellButtonsInSquare(this.options);
			this.gridHistory = [];
			this.isPlaying(false);
			this.isPausing(false);
		}

		public skipToPrevious(): void {
			if (this.gridHistory.length > 1) {
				const lastElementIndex = this.gridHistory.length - 1;
				this.gridHistory.splice(lastElementIndex, 1);
				this.refreshCellButtons();
				this.isEnabled(false);
			} else {
				this.pause();
				this.setIsPlayingIsPausing(false, false);
			}
		}

		public play(): void {
			this.isEnabled(false);
			this.setIsPlayingIsPausing(true, false);
			this.playIntervalId = setInterval((context: Board) => {
				context.skipToNext();
			}, this.options.normalMutationDelay, this);
		}

		public pause(): void {
			this.isEnabled(false);
			this.setIsPlayingIsPausing(false, true);
			if (this.playIntervalId) {
				this.stopAction();
			}
		}

		public fastRewind(): void {
			this.setIsPlayingIsPausing(true, false);
			this.isEnabled(false);
			this.playIntervalId = setInterval((context: Board) => {
				context.skipToPrevious();
			}, this.options.rapidMutationDelay, this);
		}

		public fastForward(): void {
			this.setIsPlayingIsPausing(true, false);
			this.isEnabled(false);
			this.playIntervalId = setInterval((context: Board) => {
				context.skipToNext();
			}, this.options.rapidMutationDelay, this);
		}

		private stopAction() {
			clearInterval(this.playIntervalId);
		}

		public export(): string {
			if (this.isPlaying()) {
				return "[]";
			}

			return `[${this.getAliveCells().join(",")}]`;
		}

		public import(cells: string): void {
			this.importedCells = Cell.fromJsonArray(cells);
			this.initCellButtonsInSquare(this.options);
			this.importedCells = [];
		}

		private getCellStateFromImported(x: number, y: number): CellState {
			const isImportedCell = Enumerable.from(this.importedCells)
				.singleOrDefault((c: Cell) => c.x === x && c.y === y) !== null;
			return isImportedCell ? CellState.Alive : CellState.Dead;
		}
	}
}