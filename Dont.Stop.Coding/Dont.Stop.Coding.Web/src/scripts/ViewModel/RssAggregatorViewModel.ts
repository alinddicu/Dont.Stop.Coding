/// <reference path="../../../typings/knockout.d.ts"/>

namespace ViewModel {
	export class RssAggregatorViewModel extends ViewModelBase {
		public pageName = "rss-aggregator";
		private static defaultFeed: RssAggregator.IRssFeedMenuEntry = RssAggregator.RssFeedsMenu.entries[0];

		public rssFeedsMenuOpen = ko.observable(false);
		public feedItems: KnockoutObservableArray<RssAggregator.IRssItem> = ko.observableArray([]);
		public currentChannel = ko.observable(RssAggregatorViewModel.defaultFeed.channel);

		public rssFeedsMenuEntries = RssAggregator.RssFeedsMenu.entries;
		public currentUrl = RssAggregatorViewModel.defaultFeed.url;

		constructor(appsRunner: IAppsRunner, feedUrl?: string) {
			super(appsRunner);
			this.backgroundColor("#8fc1e3");
			if (feedUrl != null) {
				this.currentUrl = feedUrl;
			}

			this.getFeed(this.currentUrl);
		}

		public getFeed(url: string): void {
			this.appsRunner.startWorking();
			this.appsRunner.api.getRss(url)
				.done((rssItems: RssAggregator.IRss) => {
					const rssFeed = new RssAggregator.RssFeed(rssItems);
					this.feedItems(rssFeed.channel.item);

					this.currentChannel(rssFeed.channel.title);
					this.currentUrl = url;
				})
				.fail((jqXhr: string, textStatus: string, errorThrown: string) => {
					this.appsRunner.finishWorking(`Error when calling '${url}'`);
				})
				.always(() => {
					this.rssFeedsMenuOpen(false);
					this.appsRunner.working(false);
				});
		}

		public navigateToFeed(feedUrl: string): void {
			this.appsRunner.gotoRssAggregator(feedUrl);
		}
	}
}