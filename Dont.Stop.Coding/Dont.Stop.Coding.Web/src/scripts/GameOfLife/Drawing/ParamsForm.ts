﻿namespace GameOfLife.Drawing {
	export class ParamsForm {
		public options: IGameOfLifeOptions;

		public init(): Board {
			this.options = {
				cellsPerRow: Tools.InputValueConverter.valueOrDefault<number>("cellsPerRow", 7),
				isShowCellsCoordinates: Tools.InputValueConverter.valueOrDefault<boolean>("isShowCellsCoordinates", false),
				cellSize: Tools.InputValueConverter.valueOrDefault<number>("cellSize", 42),
				normalMutationDelay: Tools.InputValueConverter.valueOrDefault<number>("normalMutationDelay", 100),
				rapidMutationDelay: Tools.InputValueConverter.valueOrDefault<number>("rapidMutationDelay", 10),
				aliveCellColor: Tools.InputValueConverter.valueOrDefault<string>("aliveCellColor", "#374785"),
				deadCellColor: Tools.InputValueConverter.valueOrDefault<string>("deadCellColor", "#a8d0e6")
			};

			return new Board(this.options);
		}
	}
}