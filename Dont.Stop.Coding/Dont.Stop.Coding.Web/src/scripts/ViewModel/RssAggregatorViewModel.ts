/// <reference path="../../../typings/knockout.d.ts"/>

namespace ViewModel {
	import IRssItems = RssAggregator.IRss;
	import RssFeed = RssAggregator.IRssFeed;

	export class RssAggregatorViewModel extends ViewModelBase {
		public pageName = "rss-aggregator";
		private static defaultFeed: RssAggregator.IRssFeed = RssAggregator.RssFeeds.rssFeeds[0];

		public rssMenuOpen = ko.observable(false);

		public rssFeeds: RssFeed[] = RssAggregator.RssFeeds.rssFeeds;
		public feedItems: KnockoutObservableArray<RssAggregator.IItem> = ko.observableArray([]);
		public currentChannel = ko.observable(RssAggregatorViewModel.defaultFeed.channel);
		public currentUrl = RssAggregatorViewModel.defaultFeed.url;

		constructor(appsRunner: IAppsRunner) {
			super(appsRunner);
			this.backgroundColor("#8fc1e3");
			this.getFeed(this.rssFeeds[0].url);
		}

		public render() {
			super.render();
			this.getFeed(this.rssFeeds[0].url);
		}

		public getFeed(url: string): void {
			this.appsRunner.working(true);
			super.render();
			this.rssMenuOpen(false);
			this.appsRunner.api.getRss(url)
				.done((rssItems: IRssItems) => {
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