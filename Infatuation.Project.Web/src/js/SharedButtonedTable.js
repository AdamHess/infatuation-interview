import React from 'react';

export default class SharedButtonedTable extends React.Component {
    constructor(opts) {
        super(opts);
    }
    render() {
        return (
            <table className="table" >
                <Header />
                <tbody>
                    {this.props.items.map((item, index) =>
                        (<tr>
                            <td>{item.id}</td>
                            <td>{item.fullName}</td>
                            <td>{item.createdAt}</td>
                            <td>{item.stargazersCount}</td>
                            <td>{item.language}</td>
                            <td><a href={item.htmlUrl}>Access</a></td>
                            <td><button className={this.props.buttonClassName} data-id={item.id} onClick={this.props.onButtonClick}>{this.props.buttonText}</button></td>
                        </tr>))}
                </tbody>
            </table>);

    }
}

function Header() {
    return (<thead>
        <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Created At</th>
            <th>Stargazers</th>
            <th>Language</th>
            <th>Link</th>
            <th></th>
        </tr>
    </thead>);
}
