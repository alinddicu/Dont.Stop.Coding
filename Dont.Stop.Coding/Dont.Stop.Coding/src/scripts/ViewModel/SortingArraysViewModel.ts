namespace ViewModel {
	export class SortingArraysViewModel extends ViewModelBase {
		public pageName = "sorting-arrays";
		public paramsOpen = ko.observable(false);

		constructor() {
			super();
			this.backgroundColor("#8ee4ae");
		}

		public render(): void {
			super.render();
			this.sort();
		}

		protected paramChangedHandler(): void {
			this.sort();
		}

		private sort(): void {
			const startValue = Tools.InputValueConverter.valueOrDefault<number>("startValue", 1);
			const drawParams = {
				step: Tools.InputValueConverter.valueOrDefault<number>("step", 10),
				delay: Tools.InputValueConverter.valueOrDefault<number>("delay", 50),
				penColor: Tools.InputValueConverter.valueOrDefault<string>("penColor", "#edf5e1"),
				backgroundColor: Tools.InputValueConverter.valueOrDefault<string>("backgroundColor", "#379683"),
				fontSize: Tools.InputValueConverter.valueOrDefault<number>("fontSize", 16),
				startValue: startValue
			};

			const arraySize = Tools.InputValueConverter.valueOrDefault<number>("arraySize", 32);
			const arrayToSort = new Sorting.Tools.RandomArrayGenerator().Generate(arraySize, startValue);
			new Sorting.Drawing.MultiCanvasDrawer(document, drawParams).draw(arrayToSort);

			this.paramsOpen(false);
		}
	}
}