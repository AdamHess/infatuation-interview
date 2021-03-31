using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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

        public GithubController(ILogger<GithubController> logger,
            GitHubClient client,
            IMapper mapper)
        {
            _logger = logger;
            _githubClient = client;
            _mapper = mapper;
        }
        [HttpGet]
        [Route("/githubrepos/search")]
        public async Task<IActionResult> Search(string q, int pagesize = 30, int page = 0)
        {

            var srr = new SearchRepositoriesRequest(q)
            {
                PerPage = pagesize, 
                Page = page, 
                In = new[] { InQualifier.Name }
            };

            try
            {
                var result = await _githubClient.Search.SearchRepo(srr);
                return Json(result);
            }
            catch (Exception e)
            {
                _logger.LogInformation("Problem", e);
                return Problem();
            }

        }
    }
}
