namespace Dont.Stop.Coding.WebApi.Net.Controllers
{
	using System.Xml.Serialization;

	[XmlRoot("rss")]
	public class Rss
	{
		[XmlElement("channel")]
		public Channel Channel { get; set; }
	}

	public class Channel
	{
		[XmlElement("description")]
		public string Description { get; set; }

		[XmlElement("title")]
		public string Title { get; set; }
	}
}