namespace RssAggregator {
	export interface IRssFeedMenuEntry {
		channel: string;
		url: string;
	}

	export class RssFeedsMenu {
		public static entries: IRssFeedMenuEntry[] = [
			{
				channel: "Franceinfo - Monde",
				url: "https://www.francetvinfo.fr/monde.rss"
			},
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
	}
}