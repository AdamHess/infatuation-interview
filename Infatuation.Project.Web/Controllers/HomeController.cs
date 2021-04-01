using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Infatuation.Project.Web.Models;
using Infatuation.Foundation.LocalServiceClient;
using Infatuation.Foundation.LocalServiceClient.Models;
using Microsoft.Extensions.Configuration;
using Octokit;
using Activity = System.Diagnostics.Activity;

namespace Infatuation.Project.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly LocalServiceClient _localServiceClient;
        private readonly GitHubClient _githubClient;
        private readonly IMapper _mapper;

        public HomeController(ILogger<HomeController> logger, 
            LocalServiceClient localLocalServiceClient, 
            GitHubClient client, 
            IMapper mapper)
        {
            _logger = logger;
            _localServiceClient = localLocalServiceClient;
            _githubClient = client;
            _mapper = mapper;
        }


        public IActionResult Index()
        {
            return View();
        }


        public IActionResult SearchGithub()
        {
            return View();

        }


        public async Task<IActionResult> GithubResults(string q)
        {
            var srr = new SearchRepositoriesRequest(q);
            var result = await _githubClient.Search.SearchRepo(srr);
            return PartialView(result);
        }

        public async Task<ActionResult> SaveGithubRepo(long githubRepoId)
        {
            try
            {
                var repo = await _githubClient.Repository.Get(githubRepoId);
                var repoItem  = _mapper.Map<RepoItem>(repo);
                var result =_localServiceClient.AddRepoItem(repoItem);
                if (!result)
                {
                    return Problem();
                }
            }
            catch (NotFoundException e)
            {

                return NotFound("Invalid Github Repo Id");
            }
            return Ok();
        }
        [HttpDelete]
        public IActionResult DeleteRepo(long id)
        {
            var result = _localServiceClient.DeleteRepoItem(id);
            if (result)
            {
                return Ok();
            }
            else
            {
                return Problem();
            }
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
