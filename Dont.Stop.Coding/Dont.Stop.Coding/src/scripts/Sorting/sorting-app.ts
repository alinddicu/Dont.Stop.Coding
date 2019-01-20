function sort() {
	function valueOrDefault<T>(elementId: string, defaultValue: any): T {
		const inputField = document.getElementById(elementId) as HTMLFormElement;

		let value;
		try {
			if (typeof defaultValue === "number") {
				value = inputField.valueAsNumber;
			}
			else if (typeof defaultValue === "string") {
				value = inputField.value;
			} else {
				value = inputField.valueAsDate;
			}
		} catch (e) {
			console.error(`Problem parsing '${elementId}'`);
		}

		return value ? value : defaultValue;
	}

	const startValue = valueOrDefault<number>("startValue", 1);
	const drawParams = {
		step: valueOrDefault<number>("step", 10),
		delay: valueOrDefault<number>("delay", 50),
		penColor: valueOrDefault<string>("penColor", "#edf5e1"),
		backgroundColor: valueOrDefault<string>("backgroundColor", "#379683"),
		fontSize: valueOrDefault<number>("fontSize", 16),
		startValue: startValue
	};

	const arraySize = valueOrDefault<number>("arraySize", 32);
	const arrayToSort = new Sorting.Tools.RandomArrayGenerator().Generate(arraySize, startValue);
	new Sorting.Drawing.MultiCanvasDrawer(document, drawParams).draw(arrayToSort);
}
