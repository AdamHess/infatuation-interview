import $ from 'jquery'
import React from 'react';
import SharedButtonedTable from './SharedButtonedTable'

export default class SavedRepos extends React.Component {
    constructor(options) {
        super(options);
        this.deleteRepo = this.deleteRepo.bind(this);
    }
    render() {
        if (this.state && this.state.savedRepos) {
        return (<SharedButtonedTable items={this.state.savedRepos} buttonClassName="btn btn-danger" onButtonClick={this.deleteRepo} buttonText="Delete"/>);
        }
        else {
            return <h2>No Saved Repos, add some!</h2>            
        }

    }
    async deleteRepo(e) {
        await fetch(`/localrepo/${e.target.dataset.id}`,
        {            
            method: 'DELETE'
        })                        
        .catch(s => alert("unable to delete"));
        this.setState((prevState, props) => ({
            savedRepos: prevState.savedRepos.filter(m => m.id != e.target.dataset.id)
          }));                                
    }
    componentDidMount() {
        fetch("/localrepo")
        .then(res => res.json())
        .then((data) => {
                this.setState({ savedRepos: data });
            }).catch(e => alert("Error Loading Saved Repos"));
            
    }
}
