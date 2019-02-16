'use strict';

namespace RssAggregator {

	export class RssFeed {
		public channel: IRssChannel;


		constructor(rss: IRss) {
			this.cleanRssItems(rss);
			this.handleThumbnail(rss);
			this.channel = rss.channel;
		}

		private cleanRssItems(rss: IRss): void {
			rss.channel.item.map((item: IRssItem) => {
				const description = item.description;
				const divIndex = description.indexOf("<div");
				const endOfDescription = divIndex === -1 ? description.length - 1 : divIndex;
				item.description = description
					.substring(0, endOfDescription)
					.replace(/&amp;/g, "")
					.replace(/&nbsp;/g, " ")
					.replace(/&nbsp/g, " ")
					.replace(/nbsp;/g, " ")
					.replace(/nbsp/g, " ");
			});
		}

		handleThumbnail(rss: IRss): void {
			rss.channel.item.map((item: IRssItem) => {
				if (!item.thumbnail) {
					if (item.enclosure) {
						/**
						 * https://www.francetvinfo.fr/monde.rss
						 */
						item.thumbnail = item.enclosure["@attributes"].url;
					} else {
						item.thumbnail = null;
					}
				} else {
				/*
				 * http://www.cbn.com/cbnnews/world/feed/
				 * plus others handled server side in php RssController
				*/
				}
			});
		}
	}
}