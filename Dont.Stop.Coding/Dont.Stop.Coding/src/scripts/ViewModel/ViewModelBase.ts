namespace ViewModel {
	export class ViewModelBase {
		protected workflow: IWorkflow;
		public pageName = "";
		public backgroundColor = ko.observable("");

		constructor(workflow: IWorkflow) {
			this.workflow = workflow;
		}
		
		public render(): void {
			document.body.style.background = this.backgroundColor();
		}

		protected paramChangedHandler(): void {
		}

		public onParamChanged(caller: SortingArraysViewModel, event: KeyboardEvent): void {
			if (event.keyCode === 13) {
				this.paramChangedHandler();
			}
		}
	}
}