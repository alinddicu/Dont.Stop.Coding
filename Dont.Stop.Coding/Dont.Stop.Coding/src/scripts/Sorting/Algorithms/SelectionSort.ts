namespace Sorting.Algorithms {
	export class SelectionSort extends SortBase {
		public execute(unsortedList: number[]): number[] {
			super.execute(unsortedList);
			const sortedList = super.copy(unsortedList);
			super.addToIntermediateSorts(unsortedList);

			const count = sortedList.length;
			for (let i = count - 1; i >= 0; i--) {
				const minValue = this.getMin(sortedList, i);
				sortedList.splice(minValue.position, 1);
				sortedList.push(minValue.value);

				this.addToIntermediateSorts(sortedList);
			}

			this.stopWatch();
			return sortedList;
		}

		private getMin(values: number[], limit: number): MinValue {
			let position = 0;
			let min = values[position];
			for (var i = 0; i <= limit; i++) {
				var item = values[i];
				if (item >= min) {
					continue;
				}

				min = item;
				position = i;
			}

			return new MinValue(min, position);
		}
	}

	class MinValue {

		value: number;
		position: number;

		constructor(value: number, position: number) {
			this.value = value;
			this.position = position;
		}
	}
}