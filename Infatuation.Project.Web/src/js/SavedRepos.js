import $ from 'jquery'
import React from 'react';
import TableRow from './Shared/TableRow'
import SharedHeader from './SharedHeader'

export default class SavedRepos extends React.Component {
    constructor(options) {
        super(options);
        this.deleteRepo = this.deleteRepo.bind(this);
    }
    render() {
        if (this.state && this.state.savedRepos) {
        return (
                <table className="table" >
                    <SharedHeader/>
                    <tbody>
                        {this.state.savedRepos.map((item, index) =>
                            <TableRow item={item}>
                                <td><div className="btn btn-danger deleteButton" onClick={this.deleteRepo} data-id={item.id}>Delete</div></td>
                            </TableRow>                            
                        )}

                    </tbody>
                </table>)
        }
        else {
            return <h2>No Saved Repos, add some!</h2>
            
        }

    }
    async deleteRepo(e) {
        await fetch(`/localservice/${e.target.dataset.id}`,
        {            
            method: 'DELETE'
        })                        
        .catch(s => alert("unable to delete"));
        this.setState((prevState, props) => ({
            savedRepos: prevState.savedRepos.filter(m => m.id != e.target.dataset.id)
          }));                                
    }
    componentDidMount() {
        fetch("/localservice")
        .then(res => res.json())
        .then((data) => {
                this.setState({ savedRepos: data });
            })
    }
}
