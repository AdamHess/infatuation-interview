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

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
