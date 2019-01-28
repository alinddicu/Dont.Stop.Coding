namespace GoL.Drawing {
	export class ParamsForm {
		public options: IGoLOptions;

		public init(): Board {
			this.options = {
				cellsPerRow: Tools.InputValueConverter.valueOrDefault<number>("cellsPerRow", 6),
				isShowCellsCoordinates: Tools.InputValueConverter.valueOrDefault<boolean>("isShowCellsCoordinates", false),
				cellSize: Tools.InputValueConverter.valueOrDefault<number>("cellSize", 50),
				normalMutationDelay: Tools.InputValueConverter.valueOrDefault<number>("normalMutationDelay", 100),
				rapidMutationDelay: Tools.InputValueConverter.valueOrDefault<number>("rapidMutationDelay", 10),
				aliveCellColor: Tools.InputValueConverter.valueOrDefault<string>("aliveCellColor", "#374785"),
				deadCellColor: Tools.InputValueConverter.valueOrDefault<string>("deadCellColor", "#a8d0e6")
			};

			return new Board(this.options);
		}
	}
}