namespace GoL.Drawing {
	export interface IGoLOptions {
		cellsPerRow: number;
		isShowCellsCoordinates: boolean;
		cellSize: number;
		normalMutationDelay: number;
		rapidMutationDelay: number;
		aliveCellColor: string;
		deadCellColor: string;
	}
}