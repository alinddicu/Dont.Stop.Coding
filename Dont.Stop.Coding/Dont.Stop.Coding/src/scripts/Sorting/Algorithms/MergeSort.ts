namespace Sorting.Algorithms {
	export class MergeSort extends SortBase {
		private arrayCopy: number[];

		public execute(unsortedList: number[]) {
			super.execute(unsortedList);
			this.arrayCopy = super.copy(unsortedList);
			super.addToIntermediateSorts(this.arrayCopy);
			
			this.topDownMergeSort(this.arrayCopy, [], this.arrayCopy.length);

			this.stopWatch();
			return this.arrayCopy;
		}

		private topDownMergeSort(a: number[], b: number[], n: number): void {
			this.copyArray(a, 0, n, b);
			this.topDownSplitMerge(b, 0, n, a);
		}

		private topDownSplitMerge(b: number[], iBegin: number, iEnd: number, a: number[]): void {
			if (iEnd - iBegin < 2) {
				return;
			}

			const iMiddle = Math.floor ((iEnd + iBegin) / 2);
			this.topDownSplitMerge(a, iBegin, iMiddle, b);
			this.topDownSplitMerge(a, iMiddle, iEnd, b);

			this.topDownMerge(b, iBegin, iMiddle, iEnd, a);
		}

		private topDownMerge(a: number[], iBegin: number, iMiddle: number, iEnd: number, b: number[]): void {
			let i = iBegin;
			let j = iMiddle;

			for (let k = iBegin; k < iEnd; k++) {
				if (i < iMiddle && (j >= iEnd || a[i] <= a[j])) {
					b[k] = a[i];
					i++;
				}
				else {
					b[k] = a[j];
					j++;
				}
			}

			super.addToIntermediateSorts(this.arrayCopy);
		}

		private copyArray(a: number[], iBegin: number, iEnd: number, b: number[]): void {
			for (let k = iBegin; k < iEnd; k++) {
				b[k] = a[k];
			}
		}
	}
}