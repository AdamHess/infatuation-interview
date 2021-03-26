using System;
using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Text.Json;
using Infatuation.Foundation.LocalServiceClient.Models;
using RestSharp;
using RestSharp.Serializers.SystemTextJson;

namespace Infatuation.Foundation.LocalServiceClient
{
    public class LocalServiceClient
    {
        private readonly string _serviceUrl;
        private RestClient _client;


        public LocalServiceClient(string ServiceUrl)
        {
            _serviceUrl = ServiceUrl;
            ConfigureClient();
        }

        public LocalServiceClient()
        {
            _serviceUrl = "http://localhost:8080/";
            ConfigureClient();
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
                throw new Exception();
            }
           return result.Content == "OK";
        }

        public IEnumerable<RepoItem> GetRepos()
        {

            var request = new RestRequest(ServiceConstants.Repo, Method.GET);
            var result = _client.Get<RepoListing>(request);
            if (result.ResponseStatus == ResponseStatus.Error)
            {
                throw new Exception();
            }
            //restsharp builtin serializer not working
            var data = JsonSerializer.Deserialize<RepoListing>(result.Content);
            return data?.Repos;
        }

        public void AddRepoItem(RepoItem toAdd)
        {
            var request = new RestRequest(ServiceConstants.Repo, Method.POST)
                .AddJsonBody(toAdd);
            var result = _client.Execute(request);

        }

        public void DeleteRepoItem(string id)
        {
            var request = new RestRequest(ServiceConstants.Repo + "{id}", Method.DELETE)
                .AddUrlSegment("id", id);
            var result = _client.Execute(request);
        }
    }
}
