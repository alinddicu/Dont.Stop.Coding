namespace Dont.Stop.Coding.WebApi.Net.Controllers
{
	using System.Linq;
	using System.Net;
	using System.Threading.Tasks;
	using System.Xml;
	using System.Net.Http;
	using System.Xml.Linq;
	using System.Xml.Serialization;
	using Microsoft.AspNetCore.Mvc;
	using Newtonsoft.Json;

	[Route("api/[controller]")]
	public class RssController : Controller
	{
		// GET api/ws
		[HttpGet]
		public async Task<object> Get(string feed)
		{
			var feedUrl = WebUtility.UrlDecode(feed);
			string xml;

			using (var client = new HttpClient())
			using (var response = await client.GetAsync(feedUrl))
			using (var content = response.Content)
			{
				xml = await content.ReadAsStringAsync();
			}

			// problem: <copyright><![CDATA[Copyright 2011. The Christian Broadcasting Network, Inc. &nbsp;]]></copyright>

			var xdoc = XDocument.Parse(xml);
			var nodes = xdoc.DescendantNodes().OfType<XCData>().ToList();
			foreach (var node in nodes)
			{
				node.ReplaceWith(new XText(XmlEscape(node.Value)));
			}

			var doc = new XmlDocument();
			doc.LoadXml(xdoc.ToString());
			return JsonConvert.SerializeXmlNode(doc.DocumentElement.FirstChild);
		}

		private async Task<object> Deserialize(string feed)
		{

			var feedUrl = WebUtility.UrlDecode(feed);
			string xml;

			Rss rss;
			var serializer = new XmlSerializer(typeof(Rss));
			using (var client = new HttpClient())
			using (var response = await client.GetAsync(feedUrl))
			using (var content = response.Content)
			using (var stream = await content.ReadAsStreamAsync())
			{
				xml = await content.ReadAsStringAsync();
				rss = (Rss)serializer.Deserialize(stream);
			}

			// <copyright><![CDATA[Copyright 2011. The Christian Broadcasting Network, Inc.]]></copyright>

			//var xdoc = XDocument.Parse(xml);
			//var nodes = xdoc.DescendantNodes().OfType<XCData>().ToList();
			//foreach (var node in nodes)
			//{
			//	node.ReplaceWith(new XText(XmlEscape(node.Value)));
			//}

			//var doc = new XmlDocument();
			//doc.LoadXml(xdoc.ToString());
			//return JsonConvert.SerializeXmlNode(doc.DocumentElement.FirstChild);

			return rss;
		}

		private static string XmlEscape(string unescaped)
		{
			var doc = new XmlDocument();
			XmlNode node = doc.CreateElement("root");
			node.InnerText = unescaped;
			return node.InnerXml;
		}
	}
}
