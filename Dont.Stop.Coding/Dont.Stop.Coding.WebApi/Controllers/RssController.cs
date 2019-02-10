namespace Dont.Stop.Coding.WebApi.Net.Controllers
{
	using System.Threading.Tasks;
	using System.Net.Http;
	using Microsoft.AspNetCore.Mvc;

	[Route("api/[controller]")]
	public class RssController : Controller
	{
		protected virtual string GetApiUrl(string feed)
		{
			return $"http://dontstopcod.in/api/rss?feed={feed}";
		}

		// GET api/rss
		[HttpGet]
		public async Task<string> Get(string feed)
		{
			string jsonRss;
			using (var client = new HttpClient())
			using (var response = await client.GetAsync(GetApiUrl(feed)))
			using (var content = response.Content)
			{
				jsonRss = await content.ReadAsStringAsync();
			}

			return jsonRss;
		}
	}
}
