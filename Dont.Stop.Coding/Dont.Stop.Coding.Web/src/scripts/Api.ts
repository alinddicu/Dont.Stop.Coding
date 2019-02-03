class Api implements IApi {
	private jQuery: any;

	constructor(jQuery: any) {
		this.jQuery = jQuery;
	}

	public getRss(url: string): any {
		return this.jQuery.getJSON("/api/rss", { "feed": encodeURIComponent(url)});
	}
}