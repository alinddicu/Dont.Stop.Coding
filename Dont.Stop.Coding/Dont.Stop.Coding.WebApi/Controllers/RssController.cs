namespace Dont.Stop.Coding.WebApi.Net.Controllers
{
	using System.Threading.Tasks;
	using System.Net.Http;
	using Microsoft.AspNetCore.Mvc;

	[Route("api/[controller]")]
	public class RssController : Controller
	{
		// GET api/ws
		[HttpGet]
		public async Task<string> Get(string feed)
		{
			var apiUrl = $"http://dontstopcod.in/api/rss?feed={feed}";

			using (var client = new HttpClient())
			using (var response = await client.GetAsync(apiUrl))
			using (var content = response.Content)
			{
				return await content.ReadAsStringAsync();
			}
		}
	}
}
