/// <reference path="../../../typings/knockout.d.ts"/>

namespace ViewModel {
	export class RssAggregatorViewModel extends ViewModelBase {
		public pageName = "rss-aggregator";
		public rssItems: KnockoutObservableArray<any> = ko.observableArray([]);
		public menuOpen = ko.observable(false);
		public rssFeeds: any = [
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
			}
		];

		constructor(workflow: IAppsRunner) {
			super(workflow);
			this.backgroundColor("#8fc1e3");
			this.callUrl("http://www.cbn.com/cbnnews/world/feed/");
		}

		public callUrl(url: string): void {
			var self = this;
			super.render();
			this.workflow.api.getRss(url)
				.done(function (rss: any) {
					self.rssItems([]);
					rss.channel.item.map(function (rssItem: any) {
						self.rssItems.push(rssItem);
					});
				})
				.fail(function () {
					// todo
				})
				.always(function () {
					// todo 
				});
		}
	}
}