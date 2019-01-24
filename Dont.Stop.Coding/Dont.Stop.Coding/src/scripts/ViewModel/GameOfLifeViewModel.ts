
namespace ViewModel {
	export class GameOfLifeViewModel implements IViewModel {
		private workflow: IWorkflow;
		private params: GoL.Drawing.ParamsForm;

		public pageName = "game-of-life";
		public board: GoL.Drawing.Board;
		public isParamsVisible: KnockoutObservable<boolean> = ko.observable(false);
		public isExportVisible: KnockoutObservable<boolean> = ko.observable(false);
		public isImportVisible: KnockoutObservable<boolean> = ko.observable(false);

		constructor(workflow: IWorkflow) {
			this.workflow = workflow;
			this.params = new GoL.Drawing.ParamsForm();
			this.board = this.params.init();
		}

		public render(): void {
			// all is done in the constructor;
		}

		public reinitBoard(): void {
			this.board = this.params.init();
			this.board.initCellButtonsInSquare(this.params.options);
			this.isParamsVisible(false);
			this.board.isEnabled(true);
		}

		public showParams(): void {
			const currentValue = this.isParamsVisible();
			this.isParamsVisible(!currentValue);
			this.board.isEnabled(currentValue);
		}

		public exportAliveCells(): void {
			const currentValue = this.isExportVisible();
			this.board.isEnabled(currentValue);
			this.isExportVisible(!currentValue);
			var textArea = document.getElementById("exportTextArea") as HTMLTextAreaElement;
			if (textArea) {
				textArea.value = this.board.export();
			}
		}

		public showImportAliveCells(): void {
			const currentValue = this.isImportVisible();
			this.isImportVisible(!currentValue);
			this.board.isEnabled(currentValue);
		}

		public importAliveCells(): void {
			var textArea = document.getElementById("importTextArea") as HTMLTextAreaElement;
			if (textArea && textArea.value) {
				this.board.import(textArea.value);
			}

			this.isImportVisible(false);
			this.board.isEnabled(true);
		}
	}
}