namespace ViewModel {
	export interface IViewModel {
		pageName: string;
		render(context: any): void;
	}
}