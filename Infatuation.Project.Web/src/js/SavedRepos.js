import $ from 'jquery'
import React from 'react';
import SharedButtonedTable from './SharedButtonedTable'

export default class SavedRepos extends React.Component {
    constructor(options) {
        super(options);
        this.deleteRepo = this.deleteRepo.bind(this);
        this.state = {
            loading: true,
            savedRepos: []
        };
    }
    render() {
        if (this.state.savedRepos) {
            return (<SharedButtonedTable items={this.state.savedRepos} buttonClassName="btn btn-danger" onButtonClick={this.deleteRepo} buttonText="Delete" />);
        }
        else if (this.state.loading) {
            return (<img src="/loadingspinner.gif" />);
        }
        else if (this.state.errorLoading) {
            return (<h2>Unable to Load Repos</h2>);
        }
        else {            
            return (<h2>No Saved Repos, add some!</h2>);
        }

    }
    async deleteRepo(e) {
        const that = this;
        fetch(`/localrepo/${e.target.dataset.id}`,
            {
                method: 'DELETE'
            })
            .then(function (res) {                
                if (!res.ok){
                    throw Error("Status is Not OK");
                }
                that.setState((prevState, props) => ({
                    savedRepos: prevState.savedRepos.filter(m => m.id != e.target.dataset.id)
                  }));                    
            })
            .catch(s => alert("Error Deleting Repo"));
    }
    componentDidMount() {
        fetch("/localrepo")
            .then(res => {                
                if (!res.ok) {
                    throw Error("Response Status is not OK");
                }
               return res.json();
            })            
            .then((data) => {
                this.setState({ savedRepos: data, loading: false });
            })
            .catch(e => {
                this.setState({ loading: false, errorLoading: true });
            });

    }
}
