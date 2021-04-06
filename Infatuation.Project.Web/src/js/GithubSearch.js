
import React from 'react';
import SharedButtonedTable from "./SharedButtonedTable"
export default class GithubSearch extends React.Component {
    constructor(opts) {
        super(opts);
        this.state = {
            searchTerm: '',
            searchResults: []
        };
        this.searchForRepo = this.searchForRepo.bind(this);
        this.saveRepo = this.saveRepo.bind(this);        
    }

    async searchForRepo(e) {

        if (e.target.value.length < 3) {
            this.setState((prevState) => {
                return {
                    searchTerm: e.target.value,
                    searchResults: []
                }
            });
            return;
        }

        this.setState((prevState) => {
            return {
                searchTerm: e.target.value,
                searchResults: prevState.searchResults ?? []
            }
        });
        const repoSearch = await (await fetch('/githubrepos/search?q=' + encodeURIComponent(this.state.searchTerm))).json();
        this.setState({
            searchResults: repoSearch,
            searchTerm: e.target.value
        });
    }
    async saveRepo(e) {
        const repoid = e.target.dataset.id;
        if (e.target.getAttribute('disabled')) {
            return;
        }
        const result = await fetch("/localservice/" + encodeURIComponent(repoid), {
            method: 'POST'
        });
        if (result.status !== 200)
        {
            alert("Error Saving");
            return;
        }
        e.target.setAttribute('disabled', true);
        e.target.innerText = "Saved"            
    }

    render() {
        if (this.state.searchResults)
        {
        return (
            <div>
                <label for="githubSearch">Search Github</label>
                <input value={this.state.searchTerm} className="form-control searchField" name="q" onChange={this.searchForRepo} />
                <SharedButtonedTable items={this.state.searchResults} buttonClassName='btn btn-primary' onButtonClick={this.saveRepo} buttonText="Save" />
            </div>
        );
        }
        else if (!this.state.searchResults && this.state.searchTerm) {
            return (<h2>No Results...</h2>);
        }

    }
}


