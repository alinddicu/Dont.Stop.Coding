namespace Sorting.Algorithms {
	export class HeapSort extends SortBase {
		private arrayCopy: number[];

		public execute(unsortedList: number[]): number[] {
	
		super.execute(unsortedList);
		this.arrayCopy = super.copy(unsortedList);
		super.addToIntermediateSorts(this.arrayCopy);

		this.sort(this.arrayCopy);

		this.stopWatch();
		return this.arrayCopy;
	}

		private sort(arr: number[]):void
		{
			const n = arr.length;

			// Build heap (rearrange array) 
			for (let i = n / 2 - 1; i >= 0; i--) {
				this.heapify(arr, n, i);
				this.addToIntermediateSorts(this.arrayCopy);
			}

			// One by one extract an element from heap 
			for (let i = n - 1; i >= 0; i--) {
				// Move current root to end 
				const temp = arr[0];
				arr[0] = arr[i];
				arr[i] = temp;

				// call max heapify on the reduced heap 
				this.heapify(arr, i, 0);
				this.addToIntermediateSorts(this.arrayCopy);
			}
		}

		// To heapify a subtree rooted with node i which is 
		// an index in arr[]. n is size of heap 
		private heapify(arr: number[], n: number, i: number): void
		{
			while (true) {
				let largest = i;
				// Initialize largest as root 
				const left = 2 * i + 1;
				// left = 2*i + 1 
				const right = 2 * i + 2;
				// right = 2*i + 2 

				// If left child is larger than root 
				if (left < n && arr[left] > arr[largest])
					largest = left;

				// If right child is larger than largest so far 
				if (right < n && arr[right] > arr[largest])
					largest = right;

				// If largest is not root 
				if (largest === i) {
					return;
				}

				const swap = arr[i];
				arr[i] = arr[largest];
				arr[largest] = swap;

				// Recursively heapify the affected sub-tree 
				i = largest;
			}
		}
	}
}