
import React from 'react';
import SharedButtonedTable from './SharedButtonedTable';
export default class GithubSearch extends React.Component {
  constructor(opts) {
    super(opts);
    this.state = {
      searchTerm: '',
      searchResults: [],
    };
    this.searchForRepo = this.searchForRepo.bind(this);
    this.saveRepo = this.saveRepo.bind(this);
  }

  async searchForRepo(e) {
    if (e.target.value.length < 3) {
      this.setState((prevState) => {
        return {
          searchTerm: e.target.value,
          searchResults: [],
        };
      });
      return;
    }

    this.setState((prevState) => {
      return {
        searchTerm: e.target.value,
        searchResults: prevState.searchResults ?? [],
        loading: true,

      };
    });
    fetch('/githubrepos/search?q=' + encodeURIComponent(this.state.searchTerm))
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            searchResults: data,
            searchTerm: e.target.value,
            loading: false,
          });
        });
  }
  async saveRepo(e) {
    const repoid = e.target.dataset.id;
    if (e.target.getAttribute('disabled')) {
      return;
    }
    const result = await fetch('/localrepo/' + encodeURIComponent(repoid), {
      method: 'POST',
    });
    if (!result.ok) {
      this.setState({errorSaving: true});
      return;
    }
    e.target.setAttribute('disabled', true);
    e.target.innerText = 'Saved';
  }

  render() {
    return (

      <div>
        <label htmlFor="githubSearch">Search Github</label>
        <input value={this.state.searchTerm} className="form-control searchField" name="q" onChange={this.searchForRepo} />
        {this.state.loading &&
                <img src="/loadingspinner.gif" />
        }
        {this.state.errorSaving &&
                    <h4>Error saving repo. Local Service may be offline.</h4>
        }
        {this.state.searchResults && this.state.searchTerm && !this.state.loading &&
                <SharedButtonedTable items={this.state.searchResults} buttonClassName='btn btn-primary' onButtonClick={this.saveRepo} buttonText="Save" />
        }
        {!this.state.searchResults && this.searchTerm &&
            <h2>No Results....</h2>
        }
      </div>
    );
  }
}


