interface IAppsRunner {
	api: IApi;
	working: KnockoutObservable<boolean>;
	gotoRssAggregator(feedUrl: string): void;
}