/// <reference path="../../../typings/knockout.d.ts"/>
'use strict';

namespace ViewModel {
	import RssFeedsMenu = RssAggregator.RssFeedsMenu;
	import RssFeed = RssAggregator.RssFeed;

	export class RssAggregatorViewModel extends ViewModelBase {
		public pageName = "rss-aggregator";
		private static defaultFeed: RssAggregator.IRssFeedMenuEntry = RssAggregator.RssFeedsMenu.entries[0];

		public rssFeedsMenuOpen = ko.observable(false);
		public feedItems: KnockoutObservableArray<RssAggregator.IRssItem> = ko.observableArray([]);
		public currentChannel = ko.observable(RssAggregatorViewModel.defaultFeed.channel);

		public rssFeedsMenuEntries = RssFeedsMenu.entries;
		public currentUrl = RssAggregatorViewModel.defaultFeed.url;

		constructor(appsRunner: IAppsRunner, feedId?: string) {
			super(appsRunner);
			this.backgroundColor("#8fc1e3");
			if (feedId != null) {
				this.currentUrl = RssFeedsMenu.getUrl(feedId);
			}

			this.getFeed(this.currentUrl);
		}

		public getFeed(url: string): void {
			this.appsRunner.startWorking();
			this.appsRunner.api.getRss(url)
				.done((rssItems: RssAggregator.IRss) => {
					const rssFeed: RssFeed = new RssAggregator.RssFeed(rssItems);
					this.feedItems(rssFeed.channel.item);

					this.currentChannel(rssFeed.channel.title);
					this.currentUrl = url;
				})
				.fail((jqXhr: any, textStatus: string, errorThrown: string) => {
					this.appsRunner.finishWorking(`Error when calling '${url}'`);
					this.logFailMessage(jqXhr);
				})
				.always(() => {
					this.rssFeedsMenuOpen(false);
					this.appsRunner.working(false);
				});
		}

		private logFailMessage(jqXhr: any): void {
			if (jqXhr && jqXhr.responseText) {
				console.error(jqXhr.responseText);
			}
		}

		public navigateToFeed(feedId: string): void {
			this.appsRunner.gotoRssAggregator(feedId);
		}
	}
}