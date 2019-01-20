namespace Sorting.Drawing {
	import SortBase = Algorithms.SortBase;

	export class MultiCanvasDrawer {
		private document: Document;
		private sortings: SortBase[];
		private drawParams: IDrawingParams;

		constructor(document: Document, drawParams: IDrawingParams) {
			this.document = document;
			const rankingSystem = new Tools.RankingSystem();
			this.sortings = [
				new Algorithms.BubbleSort(rankingSystem),
				new Algorithms.InsertionSort(rankingSystem),
				new Algorithms.HeapSort(rankingSystem),
				new Algorithms.MergeSort(rankingSystem),
				new Algorithms.QuickSort(rankingSystem),
				new Algorithms.SelectionSort(rankingSystem)
			];
			this.drawParams = drawParams;
		}

		public draw(arrayToSort: number[]): void {
			for (let sorting of this.sortings) {
				sorting.execute(arrayToSort);
				new SingleCanvasDrawer(sorting, this.document).draw(this.drawParams);
			}
		}
	}
}