namespace Sorting.Algorithms {
	import RankingSystem = Tools.RankingSystem;

	export class SortBase {
		private rankingSystem: RankingSystem;
		private intermediateSorts: number[][];
		private start: number;
		private end: number;
		private name: string;

		constructor(rankingSystem: RankingSystem) {
			this.rankingSystem = rankingSystem;
			this.name = this.constructor.name;
		}

		public getRank(): number {
			return this.rankingSystem.getRank(this.name);
		}

		protected copy(array: number[]): number[] {
			const newArray: number[] = [];
			for (let i = 0; i < array.length; i++) {
				newArray[i] = array[i];
			}

			return newArray;
		}

		protected addToIntermediateSorts(intermediateSort: number[]) {
			this.intermediateSorts.push(this.copy(intermediateSort));
		}

		public execute(unsortedList: number[]): number[] {
			this.start = new Date().getTime();
			this.intermediateSorts = [];
			return unsortedList;
		}

		public getIntermediateSorts(): number[][] {
			return this.intermediateSorts;
		}

		protected stopWatch(): void {
			this.end = new Date().getTime();
			this.rankingSystem.add(this.name, this.getDuration());
		}

		public getDuration(): number {
			return this.end - this.start;
		}
	}
}