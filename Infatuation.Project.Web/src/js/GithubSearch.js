
import React from 'react';

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
        return (
            <div>
                <label for="githubSearch">Search Github</label>
                <input value={this.state.searchTerm} className="form-control searchField" name="q" onChange={this.searchForRepo} />

                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Full Name</th>
                            <th>Created At</th>
                            <th>Stargazers</th>
                            <th>Language</th>
                            <th>Link</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.searchResults.map((item, index) =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.fullName}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.stargazersCount}</td>
                                <td>{item.language}</td>
                                <td><a href={item.htmlUrl}>Access</a></td>
                                <td><button className="btn btn-primary saveButton" data-id={item.id} onClick={this.saveRepo}>Save</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )

    }
}
