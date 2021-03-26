using System;
using System.Text.Json.Serialization;

namespace Infatuation.Foundation.LocalServiceClient.Models
{
    public class RepoItem
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        [JsonPropertyName("fullName")]
        public string FullName { get; set; }
        [JsonPropertyName("createdAt")]
        public DateTime CreatedAt { get; set; }
        [JsonPropertyName("stargazersCount")]
        public int StargazersCount { get; set; }
        [JsonPropertyName("language")]
        public string Language { get; set; }
        [JsonPropertyName("url")]
        public string Url { get; set; }


    }
}
