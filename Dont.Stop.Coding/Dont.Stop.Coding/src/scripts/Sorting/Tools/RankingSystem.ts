namespace Sorting.Tools {
	export class RankingSystem {

		private sortingsCount: number;

		constructor(sortingsCount: number) {
			this.sortingsCount = sortingsCount;
		}

		private ranking: Candidate[] = [];

		public clear(): void {
			this.ranking = [];
		}

		public add(sortName: string, duration: number): void {
			this.ranking.push(new Candidate(sortName, duration));
		}

		public getRank(sortName: string): number {
			if (this.ranking.length !== this.sortingsCount) {
				return null;
			}

			const rank = this.ranking
				.sort((a: Candidate, b: Candidate) => (a.duration - b.duration))
				.map((candidate, index) => new Rank(candidate, index ))
				.filter(r => r.candidate.sortName === sortName)
				[0];

			if (!rank) {
				throw `Sort name '${sortName}' not found`;
			}

			return rank.rank + 1;
		}
	}

	class Rank {
		candidate:Candidate;
		rank: number;
		constructor(candidate: Candidate, rank: number) {
			this.candidate = candidate;
			this.rank = rank;
		}
	}

	class Candidate {
		sortName: string;
		duration: number;
		constructor(sortName: string, duration: number) {
			this.sortName = sortName;
			this.duration = duration;
		}
	}
}