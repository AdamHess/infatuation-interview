using System;
using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Text.Json;
using Infatuation.Foundation.LocalServiceClient.Models;
using Microsoft.Extensions.Logging;
using RestSharp;
using RestSharp.Serializers.SystemTextJson;

namespace Infatuation.Foundation.LocalServiceClient
{
    public class LocalServiceClient
    {
        private readonly string _serviceUrl;
        private RestClient _client;
        private readonly ILogger<LocalServiceClient> _logger;


        public LocalServiceClient(string serviceUrl, ILogger<LocalServiceClient> logger)
        {
            _serviceUrl = serviceUrl;
            ConfigureClient();
            _logger = logger;
        }


        private void ConfigureClient()
        {
            _client = new RestClient(_serviceUrl);
            _client.ThrowOnDeserializationError = true;
            _client.ThrowOnAnyError = true;
            _client.UseJson();
            _client.UseSystemTextJson();
        }

        public bool CheckServerHealth()
        {
            var request = new RestRequest(ServiceConstants.Health, Method.GET);

            var result = _client.Get(request);
            if (result.ResponseStatus == ResponseStatus.Error)
            {
                _logger.LogError($"Unable to check status: {result.ErrorMessage}");
                return false;
            }
            return result.Content == "OK";
        }

        public IEnumerable<RepoItem> GetRepos()
        {

            var request = new RestRequest(ServiceConstants.Repo, Method.GET);
            var result = _client.Get<RepoListing>(request);
            if (result.ResponseStatus == ResponseStatus.Error)
            {
                _logger.LogError($"Unable to get repos: {result.ErrorMessage}" );
                return null;
            }
            //restsharp builtin serializer not working
            var data = JsonSerializer.Deserialize<RepoListing>(result.Content);
            return data?.Repos;
        }

        public bool AddRepoItem(RepoItem toAdd)
        {
            var request = new RestRequest(ServiceConstants.Repo, Method.POST)
                .AddJsonBody(toAdd);
            var result = _client.Execute(request);

            return result.IsSuccessful;

        }

        public bool DeleteRepoItem(long id)
        {
            var request = new RestRequest(ServiceConstants.Repo + "{id}", Method.DELETE)
                .AddUrlSegment("id", id);
            var result = _client.Execute(request);
            return result.IsSuccessful;
        }
    }
}
