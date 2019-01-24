
namespace ViewModel {
	export class GameOfLifeViewModel implements IViewModel {
		private workflow: IWorkflow;
		private params: GoL.Drawing.ParamsForm;

		public pageName = "game-of-life";
		public board: KnockoutObservable<GoL.Drawing.Board> = ko.observable(null);
		public isParamsVisible = ko.observable(false);
		public isExportVisible = ko.observable(false);
		public exportedCellsContent = ko.observable("");
		public isImportVisible = ko.observable(false);
		public importedCellsContent = ko.observable("");

		public isVisibleCanPlay = ko.pureComputed(() => { return !this.board().isPlaying() || this.board().isPausing(); });
		public isVisibleIsPlaying = ko.pureComputed(() => { return this.board().isPlaying() && !this.board().isPausing(); });
		public isVisibleCanPause = ko.pureComputed(() => { return !this.board().isPausing() || this.board().isPlaying(); });
		public isVisibleIsPausing = ko.pureComputed(() => { return this.board().isPausing() && !this.board().isPlaying(); });

		constructor(workflow: IWorkflow) {
			this.workflow = workflow;
			this.params = new GoL.Drawing.ParamsForm();
			this.board(this.params.init());
		}

		public render(): void {
			// all is done in the constructor;
		}

		public reinitBoard(): void {
			this.board(this.params.init());
			this.board().initCellButtonsInSquare(this.params.options);
			this.isParamsVisible(false);
			this.board().isEnabled(true);
		}

		public showParams(): void {
			const currentValue = this.isParamsVisible();
			this.isParamsVisible(!currentValue);
			this.board().isEnabled(currentValue);
		}

		public exportAliveCells(): void {
			const currentValue = this.isExportVisible();
			this.board().isEnabled(currentValue);
			this.isExportVisible(!currentValue);
			this.exportedCellsContent(this.board().export());
		}

		public showImportAliveCells(): void {
			const currentValue = this.isImportVisible();
			this.isImportVisible(!currentValue);
			this.board().isEnabled(currentValue);
		}

		public importAliveCells(): void {
			if (this.importedCellsContent()) {
				this.board().import(this.importedCellsContent());
			}

			this.isImportVisible(false);
			this.board().isEnabled(true);
		}
	}
}