namespace GoL.Drawing {
	import InputValueConverter = Tools.InputValueConverter;

	export class ParamsForm {
		public options: IGoLOptions;

		public init(): Board {
			this.options = {
				cellsPerRow: InputValueConverter.valueOrDefault<number>("cellsPerRow", 7),
				isShowCellsCoordinates: InputValueConverter.valueOrDefault<boolean>("isShowCellsCoordinates", false),
				cellSize: InputValueConverter.valueOrDefault<number>("cellSize", 50),
				normalMutationDelay: InputValueConverter.valueOrDefault<number>("normalMutationDelay", 100),
				rapidMutationDelay: InputValueConverter.valueOrDefault<number>("rapidMutationDelay", 10),
				aliveCellColor: InputValueConverter.valueOrDefault<string>("aliveCellColor", "#374785"),
				deadCellColor: InputValueConverter.valueOrDefault<string>("deadCellColor", "#a8d0e6")
			};

			return new Board(this.options);
		}
	}
}