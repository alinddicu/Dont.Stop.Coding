/// <reference path="../../../typings/knockout.d.ts"/>

namespace ViewModel {
	import RssItems = RssAggregator.IRssItems;
	import RssItem = RssAggregator.IRssItem;
	import RssFeed = RssAggregator.IRssFeed;

	export class RssAggregatorViewModel extends ViewModelBase {
		public pageName = "rss-aggregator";
		public rssItems: KnockoutObservableArray<RssItem> = ko.observableArray([]);
		public rssMenuOpen = ko.observable(false);
		public currentChannel = ko.observable(RssAggregator.RssFeeds.rssFeeds[0].channel);
		public currentUrl = RssAggregator.RssFeeds.rssFeeds[0].url;
		public rssFeeds: RssFeed[] = RssAggregator.RssFeeds.rssFeeds;

		constructor(appsRunner: IAppsRunner) {
			super(appsRunner);
			this.backgroundColor("#8fc1e3");
			this.getFeed(this.rssFeeds[0].url);
		}

		private cleanRssItems(rssItems: RssItems): void {
			rssItems.channel.item.map((rssItem: RssItem) => {
				const description = rssItem.description;
				const divIndex = description.indexOf("<div");
				const endOfDescription = divIndex === -1 ? description.length - 1 : divIndex;
				rssItem.description = description
					.substring(0, endOfDescription)
					.replace(/&amp;/g, "")
					.replace(/&nbsp;/g, " ")
					.replace(/nbsp;/g, " ");
			});
		}

		public getFeed(url: string): void {
			this.appsRunner.working(true);
			super.render();
			this.rssMenuOpen(false);
			this.appsRunner.api.getRss(url)
				.done((rssItems: RssItems) => {
					this.rssItems([]);
					this.cleanRssItems(rssItems);
					rssItems.channel.item.map((rssItem: RssItem) => {
						this.rssItems.push(rssItem);
					});

					this.currentChannel(rssItems.channel.title);
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