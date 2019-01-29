namespace ViewModel {
	export class ViewModelBase {
		public pageName = "";
		public backgroundColor = ko.observable("");
		
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