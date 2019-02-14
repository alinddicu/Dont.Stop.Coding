/// <reference path="../../../typings/linq.d.ts"/>

namespace RssAggregator {
	export interface IRssFeedMenuEntry {
		channel: string;
		feedId: string;
		url: string;
	}

	export class RssFeedsMenu {

		public static getUrl(feedId: string): string {
			return Enumerable.from(RssFeedsMenu.entries)
				.first((e: IRssFeedMenuEntry) => e.feedId === feedId)
				.url;
		}

		public static entries: IRssFeedMenuEntry[] = [
			{
				channel: "Franceinfo - Monde",
				feedId: "Franceinfo-Monde",
				url: "https://www.francetvinfo.fr/monde.rss"
			},
			{
				channel: "BBC News - Technology",
				feedId: "BBC-News-Technology",
				url: "http://feeds.bbci.co.uk/news/technology/rss.xml"
			},
			{
				channel: "BBC News - Business",
				feedId: "BBC-News-Business",
				url: "http://feeds.bbci.co.uk/news/business/rss.xml"
			},
			{
				channel: "CBNNews.com",
				feedId: "CBNNews.com",
				url: "http://www.cbn.com/cbnnews/world/feed/"
			},
			{
				channel: "BBC News - World",
				feedId: "BBC-News-World",
				url: "http://feeds.bbci.co.uk/news/world/rss.xml"
			},
			{
				channel: "Reuters: World News",
				feedId: "Reuters-World-News",
				url: "http://feeds.reuters.com/Reuters/worldNews"
			},
			{
				channel: "BBC News - UK",
				feedId: "BBC-News-UK",
				url: "http://feeds.bbci.co.uk/news/rss.xml"
			}
		];
	}
}