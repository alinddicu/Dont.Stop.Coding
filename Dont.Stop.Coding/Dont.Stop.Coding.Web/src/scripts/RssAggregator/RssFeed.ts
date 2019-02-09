namespace RssAggregator {

	export class RssFeed {
		public channel: IRssChannel;

		private cleanRssItems(rssItems: IRss): void {
			rssItems.channel.item.map((item: IRssItem) => {
				const description = item.description;
				const divIndex = description.indexOf("<div");
				const endOfDescription = divIndex === -1 ? description.length - 1 : divIndex;
				item.description = description
					.substring(0, endOfDescription)
					.replace(/&amp;/g, "")
					.replace(/&nbsp;/g, " ")
					.replace(/nbsp;/g, " ");
			});
		}

		constructor(rss: IRss) {
			this.cleanRssItems(rss);
			this.channel = rss.channel;
		}
	}
}