
namespace ViewModel {
	export class GameOfLifeViewModel implements IViewModel {
		public pageName = "game-of-life";
		private workflow: IWorkflow;

		constructor(workflow: IWorkflow) {
			this.workflow = workflow;
		}

		public render(context: any): void {
			// implement
		}
	}
}