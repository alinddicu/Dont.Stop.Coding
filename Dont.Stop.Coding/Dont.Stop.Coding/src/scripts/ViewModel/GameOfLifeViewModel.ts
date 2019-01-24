
namespace ViewModel {
	export class GameOfLifeViewModel implements IViewModel {
		public pageName = "game-of-life";
		private workflow: IWorkflow;
		public board: KnockoutObservable<GoL.Drawing.Board> = ko.observable(null);
		public isParamsVisible: KnockoutObservable<boolean> = ko.observable(false);
		public isExportVisible: KnockoutObservable<boolean> = ko.observable(false);
		public isImportVisible: KnockoutObservable<boolean> = ko.observable(false);
		private params: GoL.Drawing.ParamsForm;

		constructor(workflow: IWorkflow) {
			this.workflow = workflow;
			this.params = new GoL.Drawing.ParamsForm();
			this.board(this.params.init());
		}

		public render(): void {
			//this.board(this.params.init());
		}
	}
}