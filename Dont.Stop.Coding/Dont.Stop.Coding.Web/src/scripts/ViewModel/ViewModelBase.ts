namespace ViewModel {
	export abstract class ViewModelBase {
		protected appsRunner: IAppsRunner;
		public pageName = "";
		public backgroundColor = ko.observable("");

		constructor(appsRunner: IAppsRunner) {
			this.appsRunner = appsRunner;
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