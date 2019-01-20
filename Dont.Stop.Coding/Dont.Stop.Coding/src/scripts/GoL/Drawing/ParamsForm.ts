namespace GoL.Drawing {
	export class ParamsForm {
		public options: IGoLOptions;

		public init(): Board {
			this.options = {
				cellsPerRow: this.valueOrDefault<number>("cellsPerRow", 7),
				isShowCellsCoordinates: this.valueOrDefault<boolean>("isShowCellsCoordinates", false),
				cellSize: this.valueOrDefault<number>("cellSize", 50),
				normalMutationDelay: this.valueOrDefault<number>("normalMutationDelay", 100),
				rapidMutationDelay: this.valueOrDefault<number>("rapidMutationDelay", 10),
				aliveCellColor: this.valueOrDefault<string>("aliveCellColor", "#374785"),
				deadCellColor: this.valueOrDefault<string>("deadCellColor", "#a8d0e6")
			};

			return new Board(this.options);
		}

		private valueOrDefault<T>(elementId: string, defaultValue: any): T {
			const inputField = document.getElementById(elementId) as HTMLFormElement;

			let value;
			try {
				if (typeof defaultValue === "number") {
					value = inputField.valueAsNumber;
				}
				else if (typeof defaultValue === "string") {
					value = inputField.value;
				}
				else if (typeof defaultValue === "boolean") {
					value = inputField.checked;
				} else {
					value = inputField.valueAsDate;
				}
			} catch (e) {
				console.error(`Problem parsing '${elementId}'`);
			}

			return value ? value : defaultValue;
		}
	}
}