namespace Sorting.Algorithms {
	export class QuickSort extends SortBase {
		private arrayCopy: number[];
		public execute(unsortedList: number[]): number[] {
			super.execute(unsortedList);
			this.arrayCopy = super.copy(unsortedList);
			super.addToIntermediateSorts(this.arrayCopy);

			this.quicksort(this.arrayCopy, 0, this.arrayCopy.length - 1);

			this.stopWatch();
			return this.arrayCopy;
		}

		private quicksort(array: number[], lo: number, hi: number): void {
			if (lo < hi) {
				const pivot = this.partition(array, lo, hi);
				this.quicksort(array, lo, pivot - 1);
				this.quicksort(array, pivot + 1, hi);
			}
		}

		private partition(array: number[], lo: number, hi: number): number {
			const pivot = array[hi];
			let i = lo - 1;
			for (let j = lo; j <= hi - 1; j++) {
				if (array[j] <= pivot) {
					i++;
					this.swap(array, i, j);
				}
			}

			this.swap(array, i + 1, hi);
			this.addToIntermediateSorts(this.arrayCopy);
			return i + 1;
		}

		private swap(array: number[], i: number, j: number): void {
			const temp = array[j];
			array[j] = array[i];
			array[i] = temp;
		}
	}
}