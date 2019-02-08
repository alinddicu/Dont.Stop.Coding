/// <reference path="../../../typings/knockout.d.ts"/>

namespace ViewModel {
	import IRssFeedMenuEntry = RssAggregator.IRssFeedMenuEntry;

	export class RssAggregatorViewModel extends ViewModelBase {
		public pageName = "rss-aggregator";
		private static defaultFeed: RssAggregator.IRssFeedMenuEntry = RssAggregator.RssFeedsMenu.entries[0];

		public rssFeedsMenuOpen = ko.observable(false);

		public rssFeedsMenuEntries = RssAggregator.RssFeedsMenu.entries;
		public feedItems: KnockoutObservableArray<RssAggregator.IItem> = ko.observableArray([]);
		public currentChannel = ko.observable(RssAggregatorViewModel.defaultFeed.channel);
		public currentUrl = RssAggregatorViewModel.defaultFeed.url;

		constructor(appsRunner: IAppsRunner) {
			super(appsRunner);
			this.backgroundColor("#8fc1e3");
			this.getFeed(this.currentUrl);
		}

		public getFeed(url: string): void {
			this.appsRunner.working(true);
			super.render();
			this.rssFeedsMenuOpen(false);
			this.appsRunner.api.getRss(url)
				.done((rssItems: RssAggregator.IRss) => {
					const rssFeed  = new RssAggregator.RssFeed(rssItems);
					this.feedItems(rssFeed.channel.item);

					this.currentChannel(rssFeed.channel.title);
					this.currentUrl = url;
				})
				.fail(() => {
					// console.error(`Error when calling '${url}'`);
				})
				.always(() => {
					this.appsRunner.working(false);
				});
		}
	}
}