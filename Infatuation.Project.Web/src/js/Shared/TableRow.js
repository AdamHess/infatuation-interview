import React from 'react';

export default class TableRow extends React.Component {
    constructor(opts) {
        super(opts);        
    }
    render() {
        let item = this.props.item
        return (<tr>
        <td>{item.id}</td>
        <td>{item.fullName}</td>
        <td>{item.createdAt}</td>
        <td>{item.stargazersCount}</td>
        <td>{item.language}</td>
        <td><a href={item.htmlUrl}>Access</a></td>
        {this.props.children}        
    </tr>);
    }
}