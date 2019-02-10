namespace Dont.Stop.Coding.WebApi.Net.Controllers
{
	using Microsoft.AspNetCore.Mvc;

	[Route("api/[controller]")]
	public class RssTestController : RssController
	{
		protected override string GetApiUrl(string feed)
		{
			return $"http://dontstopcod.in/api/rsstest?feed={feed}";
		}
	}
}
