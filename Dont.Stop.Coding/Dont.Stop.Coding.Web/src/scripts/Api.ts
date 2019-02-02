class Api implements IApi {
	private jQuery: any;

	constructor(jQuery: any) {
		this.jQuery = jQuery;
	}

	public getRss(url: string): any {
		return this.jQuery.getJSON("/cakephp/ws", { "url": encodeURIComponent(url)});
	}
}