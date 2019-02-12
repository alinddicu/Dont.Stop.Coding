interface IAppsRunner {
	api: IApi;
	working: KnockoutObservable<boolean>;
	gotoRssAggregator(feedUrl: string): void;
	startWorking(): void;
	finishWorking(errorMessage: string): void;
}