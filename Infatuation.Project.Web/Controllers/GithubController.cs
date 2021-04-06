using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Infatuation.Foundation.LocalServiceClient;
using Microsoft.Extensions.Logging;
using Octokit;
using RestSharp;

namespace Infatuation.Project.Web.Controllers
{
    [ApiController]
    public class GithubController : Controller
    {

        private readonly GitHubClient _githubClient;
        private readonly IMapper _mapper;
        private readonly ILogger<GithubController> _logger;
        private readonly LocalServiceClient _localServiceClient;

        public GithubController(ILogger<GithubController> logger,
            GitHubClient client,
            LocalServiceClient lsc,
            IMapper mapper)
        {
            _logger = logger;
            _githubClient = client;
            _mapper = mapper;
            _localServiceClient = lsc;
        }
        [HttpGet]
        [Route("/githubrepos/search")]
        [ResponseCache(Duration = 500, VaryByQueryKeys = new []{"q"}, Location = ResponseCacheLocation.Any, NoStore = false) ]
        public async Task<IActionResult> Search(string q, int pagesize = 30, int page = 0)
        {

            var srr = new SearchRepositoriesRequest(q)
            {
                PerPage = pagesize,
                Page = page,
                In = new[] { InQualifier.Name },
            };

            try
            {
                var result = await _githubClient.Search.SearchRepo(srr);
                var ids =_localServiceClient.GetRepos()?
                    .Select(m => m.Id);
                if (ids != null)
                {
                    return Json( result.Items.Where(i => !ids.Contains(i.Id.ToString())));
                }

                return Json(result.Items);
            }
            catch (Exception e)
            {
                _logger.LogError( e, "Problem");
                return Problem();
            }

        }
    }
}
