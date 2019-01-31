namespace ViewModel {
	export class SortingArraysViewModel extends ViewModelBase {
		private arraySize: number = 32;
		private previousArraySize: number = 32;
		private startValue: number = 1;
		private previousStartValue: number = 1;
		private arrayToSort: number[] = new Sorting.Tools.RandomArrayGenerator().Generate(this.arraySize, this.startValue);

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
			const isKeepSameArray = Tools.InputValueConverter.valueOrDefault<boolean>("isKeepSameArray", false);
			const startValue = Tools.InputValueConverter.valueOrDefault<number>("startValue", this.startValue);
			const drawParams = {
				step: Tools.InputValueConverter.valueOrDefault<number>("step", 10),
				delay: Tools.InputValueConverter.valueOrDefault<number>("delay", 50),
				penColor: Tools.InputValueConverter.valueOrDefault<string>("penColor", "#edf5e1"),
				backgroundColor: Tools.InputValueConverter.valueOrDefault<string>("backgroundColor", "#379683"),
				fontSize: Tools.InputValueConverter.valueOrDefault<number>("fontSize", 16),
				startValue: startValue,
				isDisableSimulation: Tools.InputValueConverter.valueOrDefault<boolean>("isDisableSimulation", false)
			};

			const arraySize = Tools.InputValueConverter.valueOrDefault<number>("arraySize", this.arraySize);
			if (!isKeepSameArray || this.previousStartValue !== startValue || this.previousArraySize !== arraySize) {
				this.arrayToSort = new Sorting.Tools.RandomArrayGenerator().Generate(arraySize, startValue);
			}

			new Sorting.Drawing.MultiCanvasDrawer(document, drawParams).draw(this.arrayToSort);

			this.previousArraySize = arraySize;
			this.previousStartValue = startValue;
			this.paramsOpen(false);
		}
	}
}