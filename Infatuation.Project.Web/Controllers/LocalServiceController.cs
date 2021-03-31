using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Infatuation.Foundation.LocalServiceClient;
using Infatuation.Foundation.LocalServiceClient.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Octokit;

namespace Infatuation.Project.Web.Controllers
{
    [Route("localservice")]
    [ApiController]
    public class LocalServiceController : Controller
    {
        private readonly LocalServiceClient _localServiceClient;
        private readonly ILogger<HomeController> _logger;
        private readonly GitHubClient _githubClient;
        private readonly IMapper _mapper;
        public LocalServiceController(ILogger<HomeController> logger,
            LocalServiceClient localLocalServiceClient,
            GitHubClient client,
            IMapper mapper)
        {
            _logger = logger;
            _localServiceClient = localLocalServiceClient;
            _githubClient = client;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Json(_localServiceClient.GetRepos());
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> Post(long id)
        {
            try
            {
                var repo = await _githubClient.Repository.Get(id);
                var repoItem = _mapper.Map<RepoItem>(repo);
                var result = _localServiceClient.AddRepoItem(repoItem);
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

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
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
    }
}
