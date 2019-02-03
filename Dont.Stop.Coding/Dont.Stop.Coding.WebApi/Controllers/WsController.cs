namespace Dont.Stop.Coding.WebApi.Controllers
{
	using System.Net;
	using System.Net.Http;
	using System.Threading.Tasks;
	using System.Xml;
	using System.Xml.Linq;
	using System.Linq;
	using Microsoft.AspNetCore.Mvc;
	using Newtonsoft.Json;

	[Route("api/[controller]")]
	public class WsController : Controller
	{
		// GET api/ws
		[HttpGet]
		public async Task<object> Get(string url)
		{
			url = WebUtility.UrlDecode(url);
			string xml;

			using (var client = new HttpClient())
			using (var response = await client.GetAsync(url))
			using (var content = response.Content)
			{
				xml = await content.ReadAsStringAsync();
			}

			// <copyright><![CDATA[Copyright 2011. The Christian Broadcasting Network, Inc.]]></copyright>

			var xdoc = XDocument.Parse(xml);
			var nodes = xdoc.DescendantNodes().OfType<XCData>().ToList();
			foreach (var node in nodes)
			{
				node.ReplaceWith(new XText(XmlEscape(node.Value)));
			}

			xml = xdoc.ToString();

			var doc = new XmlDocument();
			doc.LoadXml(xml);
			return JsonConvert.SerializeXmlNode(doc.DocumentElement.FirstChild);
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
