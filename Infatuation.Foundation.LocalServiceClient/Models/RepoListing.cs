using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Infatuation.Foundation.LocalServiceClient.Models
{
    public class RepoListing
    {
        [JsonPropertyName("repos")]
        public IEnumerable<RepoItem> Repos { get; set; }

    }
}
