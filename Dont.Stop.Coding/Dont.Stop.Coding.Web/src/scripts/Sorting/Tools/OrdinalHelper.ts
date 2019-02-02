namespace Sorting.Tools {
	export class OrdinalHelper {
		public static toOrdinal(numberToFormat: number): string {
			if (numberToFormat < 0) {
				return numberToFormat.toString();
			}

			const rem = numberToFormat % 100;
			if (rem >= 11 && rem <= 13) {
				return numberToFormat + "th";
			}

			switch (numberToFormat % 10) {
				case 1:
					return numberToFormat + "st";
				case 2:
					return numberToFormat + "nd";
				case 3:
					return numberToFormat + "rd";
				default:
					return numberToFormat + "th";
			}
		}
	}
}
