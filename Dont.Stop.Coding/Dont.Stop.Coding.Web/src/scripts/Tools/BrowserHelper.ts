namespace Tools {
	export class BrowserHelper {
		public static getWidth() {
			return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		}

		public static getHeight() {
			return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		}
	}
}