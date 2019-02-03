/// <reference path="../../../typings/knockout.d.ts"/>

namespace ViewModel {
	import RssItems = Tools.IRssItems;
	import RssItem = Tools.IRssItem;

	export class RssAggregatorViewModel extends ViewModelBase {
		public pageName = "rss-aggregator";
		public rssItems: KnockoutObservableArray<RssItem> = ko.observableArray([]);
		public rssMenuOpen = ko.observable(false);
		public rssFeeds: any = [
			{
				channel: "BBC News - Technology",
				url: "http://feeds.bbci.co.uk/news/technology/rss.xml"
			},
			{
				channel: "BBC News - Business",
				url: "http://feeds.bbci.co.uk/news/business/rss.xml"
			},
			{
				channel: "CBNNews.com",
				url: "http://www.cbn.com/cbnnews/world/feed/"
			},
			{
				channel: "BBC News - World",
				url: "http://feeds.bbci.co.uk/news/world/rss.xml"
			},
			{
				channel: "Reuters: World News",
				url: "http://feeds.reuters.com/Reuters/worldNews"
			},
			{
				channel: "BBC News - UK",
				url: "http://feeds.bbci.co.uk/news/rss.xml"
			}
		];

		constructor(workflow: IAppsRunner) {
			super(workflow);
			this.backgroundColor("#8fc1e3");
			this.callUrl("http://www.cbn.com/cbnnews/world/feed/");
		}

		private cleanRssItems(rssItems: RssItems): void {
			rssItems.channel.item.map((rssItem: RssItem) => {
				const description = rssItem.description;
				const divIndex = description.indexOf("<div");
				const endOfDescription = divIndex === -1 ? description.length - 1 : divIndex;
				rssItem.description = description.substring(0, endOfDescription);
			});
		}

		public callUrl(url: string): void {
			super.render();
			this.workflow.api.getRss(url)
				.done((rssItems: RssItems) => {
					this.rssItems([]);
					this.cleanRssItems(rssItems);
					rssItems.channel.item.map((rssItem: RssItem) => {
						this.rssItems.push(rssItem);
					});

					this.rssMenuOpen(false);
				})
				.fail(() => {
					// console.error(`Error when calling '${url}'`);
				})
				.always(() => {
					// todo 
				});
		}
	}
}