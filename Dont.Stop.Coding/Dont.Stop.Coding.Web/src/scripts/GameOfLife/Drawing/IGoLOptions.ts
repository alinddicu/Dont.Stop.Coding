namespace GameOfLife.Drawing {
	export interface IGameOfLifeOptions {
		cellsPerRow: number;
		isShowCellsCoordinates: boolean;
		cellSize: number;
		normalMutationDelay: number;
		rapidMutationDelay: number;
		aliveCellColor: string;
		deadCellColor: string;
	}
}