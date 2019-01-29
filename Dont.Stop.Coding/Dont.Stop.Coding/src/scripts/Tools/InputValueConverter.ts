namespace Tools {
	export class InputValueConverter {
		public static valueOrDefault<T>(elementId: string, defaultValue: any): T {

			let value = defaultValue;
			const inputField = document.getElementById(elementId) as HTMLFormElement;
			if (!inputField) {
				return value;
			}

			try {
				if (typeof defaultValue === "number") {
					value = inputField.valueAsNumber;
				}
				else if (typeof defaultValue === "string") {
					value = inputField.value;
				}
				else if (typeof defaultValue === "boolean") {
					value = inputField.checked;
				} else {
					value = inputField.valueAsDate;
				}
			} catch (e) {
				console.error(`Problem parsing '${elementId}'`);
			}

			return value;
		}
	}
}