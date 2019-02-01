/// <reference path="../../../typings/knockout.d.ts"/>

namespace ViewModel {
	export class RssAggregatorViewModel extends ViewModelBase {
		public pageName = "rss-aggregator";
		public rssItems: KnockoutObservableArray<string> = ko.observableArray([]);

		constructor(workflow: IAppsRunner) {
			super(workflow);
			this.backgroundColor("#8fc1e3");
			this.render();
		}

		public render(): void {
			var self = this;
			super.render();
			this.workflow.api.getRss("http://www.cbn.com/cbnnews/world/feed/")
				.done(function (rss: any) {
					rss.channel.item.map(function(rssItem: any) {
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