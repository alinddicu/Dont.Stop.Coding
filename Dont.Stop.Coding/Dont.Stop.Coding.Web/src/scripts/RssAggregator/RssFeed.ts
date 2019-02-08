namespace RssAggregator {

	/*
		{
			rss: {
				"channel": {
					"title":
					"CBNNews.com",
					"link":
					"http://www.cbn.com/cbnnews/feed/",
					"description":
					"CBNNews.com Feed",
					"language":
					"en-US",
					"copyright":
					"Copyright 2011. The Christian Broadcasting Network, Inc.",
					"item":
					[
						{
							"title": "'Pray the Lord Restores Her Completely': Asia Bibi's Road to Recovery and How Christians Can Help",
							"description": "Wilson Chowdhry of the British Pakistani Christians Association warned Asia Bibi's ordeal is not over, saying it will take time for her to adjust to life outside of prison...\n",
							"thumbnail": "http://www1.cbn.com/sites/default/files/asiabibikids_si.jpg",
							"link": "http://www.cbn.com/api/urlredirect.aspx?u=http://www1.cbn.com/cbnnews/cwn/2019/january/pray-the-lord-restores-her-completely-asia-bibis-road-to-recovery-and-how-christians-can-help",
							"isVideoArticle": "false",
							"pubDate": "2019-01-31T11:56:55-05:00"
						}
					]
				}
			}
		}
	*/

	export interface IItem {
		title: string;
		description: string;
		link: string;
		pubDate: Date;
	}

	export interface IChannel {
		title: string;
		link: string;
		description: string;
		language: string;
		copyright: string;
		item: IItem[];
	}

	export interface IRss {
		channel: IChannel
	}

	export class RssFeed {
		public channel: IChannel;

		private cleanRssItems(rssItems: IRss): void {
			rssItems.channel.item.map((item: IItem) => {
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