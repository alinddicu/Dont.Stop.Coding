namespace Dont.Stop.Coding.WebApi.Controllers
{
	using System.Net;
	using System.Net.Http;
	using System.Threading.Tasks;
	using System.Xml;
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

			var doc = new XmlDocument();
			doc.LoadXml(xml);
			return JsonConvert.SerializeXmlNode(doc);
		}
	}
}
