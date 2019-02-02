namespace Sorting.Tools {
	export class RandomArrayGenerator {
		public Generate(length: number, start: number): number[] {
			const array = [];
			for (let i = start; i < length + start; i++) {
				array.push(i);
			}

			return this.shuffle(array);
		}

		private shuffle(array: number[]): number[] {
			let tmp;
			let current: number;
			let top = array.length;
			if (top) while (--top) {
				current = Math.floor(Math.random() * (top + 1));
				tmp = array[current];
				array[current] = array[top];
				array[top] = tmp;
			}

			return array;
		}
	}
}