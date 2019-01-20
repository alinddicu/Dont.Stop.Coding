namespace Sorting.Tools {
	export class RankingSystem {
		private ranking: Candidate[] = [];

		public clear(): void {
			this.ranking = [];
		}

		public add(sortName: string, duration: number): void {
			this.ranking.push(new Candidate(sortName, duration));
		}

		public getRank(sortName: string): number {
			const rank = this.ranking
				.sort((a: Candidate, b: Candidate) => (a.duration - b.duration))
				.map((candidate, index) => new Rank(candidate, index ))
				.filter(r => r.candidate.name === sortName)
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
		name: string;
		duration: number;
		constructor(name: string, duration: number) {
			this.name = name;
			this.duration = duration;
		}
	}
}