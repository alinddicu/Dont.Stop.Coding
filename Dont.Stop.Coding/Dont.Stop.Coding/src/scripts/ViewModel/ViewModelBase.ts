namespace ViewModel {
	export class ViewModelBase {
		public pageName: string;

		constructor() {
			this.pageName = "";
		}

		public render(): void {
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