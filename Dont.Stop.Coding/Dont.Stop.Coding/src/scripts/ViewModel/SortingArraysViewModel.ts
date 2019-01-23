namespace ViewModel {
	export class SortingArraysViewModel implements IViewModel {
		public pageName = "sorting-arrays";
		private workflow: IWorkflow;

		constructor(workflow: IWorkflow) {
			this.workflow = workflow;
		}

		public render(context: any): void {
			this.sort();
		}

		public showHideParams(): void {
			var div = document.getElementById("params");
			var showParams = (document.getElementById("showHideParams") as HTMLFormElement).checked;
			if (showParams) {
				div.style.display = "inline-block";
			} else {
				div.style.display = "none";
			}
		}

		public onParamChanged(caller: SortingArraysViewModel, event: KeyboardEvent): void {
			if (event.keyCode === 13) {
				this.sort();
			}
		}

		private valueOrDefault<T>(elementId: string, defaultValue: any): T {
			let value: T = defaultValue;
			try {
				const inputField = document.getElementById(elementId) as HTMLFormElement;

				if (typeof defaultValue === "number") {
					value = inputField.valueAsNumber;
				}
				else if (typeof defaultValue === "string") {
					value = inputField.value;
				} else {
					value = inputField.valueAsDate;
				}
			} catch (e) {
				console.warn(`Problem parsing '${elementId}'`);
				value = defaultValue;
			}

			return value;
		}

		private sort(): void {
			const startValue = this.valueOrDefault<number>("startValue", 1);
			const drawParams = {
				step: this.valueOrDefault<number>("step", 10),
				delay: this.valueOrDefault<number>("delay", 50),
				penColor: this.valueOrDefault<string>("penColor", "#edf5e1"),
				backgroundColor: this.valueOrDefault<string>("backgroundColor", "#379683"),
				fontSize: this.valueOrDefault<number>("fontSize", 16),
				startValue: startValue
			};

			const arraySize = this.valueOrDefault<number>("arraySize", 32);
			const arrayToSort = new Sorting.Tools.RandomArrayGenerator().Generate(arraySize, startValue);
			new Sorting.Drawing.MultiCanvasDrawer(document, drawParams).draw(arrayToSort);
		}
	}
}