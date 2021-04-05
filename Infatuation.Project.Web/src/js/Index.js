import $ from 'jquery'
import React from 'react';


export default class SavedResources extends React.Component {
    constructor(options) {
        super(options);
    }
    render() {
        if (this.state && this.state.savedRepos) {
        return (
                <table className="table" >
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
                        {this.state.savedRepos.map((item, index) =>
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.fullName}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.stargazersCount}</td>
                                <td>{item.language}</td>
                                <td><a href={item.url}>Access</a></td>
                                <td><div className="btn btn-danger deleteButton" onClick={this.deleteRepo} data-id={item.id}>Delete</div></td>
                            </tr>
                        )}

                    </tbody>
                </table>)
        }
        else {
            return <h2>No Saved Repos, add some!</h2>
            
        }

    }
    async deleteRepo(e) {
        fetch(`/localservice/${e.target.dataset.id}`,
        {            
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(s => console.log(s))
        
            $(e.target).parents('tr').fadeOut();        
    }
    componentDidMount() {
        fetch("/localservice")
        .then(res => res.json())
        .then((data) => {
                this.setState({ savedRepos: data });
            })
    }
}
