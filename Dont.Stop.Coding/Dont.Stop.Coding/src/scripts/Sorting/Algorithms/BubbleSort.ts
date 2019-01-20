namespace Sorting.Algorithms {
	export class BubbleSort extends SortBase {
		public execute(unsortedList: number[]): number[] {
			super.execute(unsortedList);
			const sortedList = super.copy(unsortedList);
			super.addToIntermediateSorts(sortedList);

			let inversion: boolean;
			do {
				inversion = false;
				for(let i = 0; i < sortedList.length - 1; i++) {
					const left: number = sortedList[i];
					const right: number = sortedList[i + 1];
					if (left > right) {
						sortedList[i] = right;
						sortedList[i + 1] = left;
						inversion = true;
						super.addToIntermediateSorts(sortedList);
					}
				}
			} while (inversion);

			this.stopWatch();
			return sortedList;
		}
	}
}