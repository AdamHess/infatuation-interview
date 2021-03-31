using AutoMapper;
using Infatuation.Foundation.LocalServiceClient.Models;
using Octokit;

namespace Infatuation.Project.Web
{
    public class GithubMappingProfile : Profile
    {

        public GithubMappingProfile()
        {
            CreateMap<Repository, RepoItem>()
                .ForMember(m => m.CreatedAt, m => m.MapFrom(z => z.CreatedAt.Date));
        }
    }
}