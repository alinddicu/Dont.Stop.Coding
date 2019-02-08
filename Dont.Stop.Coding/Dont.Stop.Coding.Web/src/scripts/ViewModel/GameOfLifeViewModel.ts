
namespace ViewModel {
	export class GameOfLifeViewModel extends ViewModelBase {
		private params: GameOfLife.Drawing.ParamsForm;

		public pageName = "game-of-life";
		public board: KnockoutObservable<GameOfLife.Drawing.Board> = ko.observable(null);
		public isParamsVisible = ko.observable(false);
		public isExportVisible = ko.observable(false);
		public exportedCellsContent = ko.observable("");
		public isImportVisible = ko.observable(false);
		public importedCellsContent = ko.observable("");

		public isVisibleCanPlay = ko.pureComputed(() => { return !this.board().isPlaying() || this.board().isPausing(); });
		public isVisibleIsPlaying = ko.pureComputed(() => { return this.board().isPlaying() && !this.board().isPausing(); });
		public isVisibleCanPause = ko.pureComputed(() => { return !this.board().isPausing() || this.board().isPlaying(); });
		public isVisibleIsPausing = ko.pureComputed(() => { return this.board().isPausing() && !this.board().isPlaying(); });

		constructor(appsRunner: IAppsRunner) {
			super(appsRunner);
			this.params = new GameOfLife.Drawing.ParamsForm();
			this.board(this.params.init());
			this.backgroundColor("#f8e9a1");
		}

		public render(): void {
			super.render();
		}

		protected paramChangedHandler(): void {
			this.reinitBoard();
		}

		public reinitBoard(): void {
			this.board(this.params.init());
			this.board().initCellButtonsInSquare(this.params.options);
			this.isParamsVisible(false);
			this.board().isEnabled(true);
		}

		public showParams(): void {
			this.isParamsVisible(true);
			this.enableBoard(false);
		}

		public closeParams(): void {
			this.isParamsVisible(false);
			this.enableBoard(true);
		}

		public exportAliveCells(): void {
			const currentValue = this.isExportVisible();
			this.board().isEnabled(currentValue);
			this.isExportVisible(!currentValue);
			this.exportedCellsContent(this.board().export());
		}

		public showImportAliveCells(): void {
			this.isImportVisible(true);
			this.enableBoard(false);
		}

		public closeImportAliveCells(): void {
			this.isImportVisible(false);
			this.enableBoard(true);
		}

		public closeExportAliveCells(): void {
			this.isExportVisible(false);
			this.enableBoard(true);
		}

		public importAliveCells(): void {
			if (this.importedCellsContent()) {
				this.board().import(this.importedCellsContent());
			}

			this.isImportVisible(false);
			this.enableBoard(true);
		}

		private enableBoard(enabled: boolean) {
			this.board().isEnabled(enabled);
		}
	}
}