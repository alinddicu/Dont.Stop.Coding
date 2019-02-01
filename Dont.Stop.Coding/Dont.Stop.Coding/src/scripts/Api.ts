class Api implements IApi {
	private jQuery: any;

	constructor(jQuery: any) {
		this.jQuery = jQuery;
	}

	public getRss(): any {
		return this.jQuery.getJSON("/cakephp/ws");
	}
}