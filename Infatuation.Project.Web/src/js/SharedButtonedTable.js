import React from 'react';
import $ from 'jquery';

export default class SharedButtonedTable extends React.Component {
    constructor(opts) {
        super(opts);
        this.refTable = React.createRef();
        this.state = {
            sortFunction: numericSortTypes().fn
        }
        this.onSortChange = this.onSortChange.bind(this);
    }
    render() {
        if (!this.props.items.length) {
            return null;
        }       
        
        return (
            <table ref={this.refTable} className="table" >
                <thead>
                    <tr>
                        <th><button onClick={this.onSortChange} data-column-name="id">Id</button></th>
                        <th><button onClick={this.onSortChange} data-column-name="fullName" data-type="string">Full Name</button></th>
                        <th><button onClick={this.onSortChange} data-column-name="createdAt" data-type="date">Created At</button></th>
                        <th><button onClick={this.onSortChange} data-column-name="stargazersCount">Stargazers</button></th>
                        <th><button onClick={this.onSortChange} data-column-name="language" data-type="string">Language</button></th>
                        <th>Link</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.sort(this.state.sortFunction).map((item, index) =>
                    (<tr>
                        <td>{item.id}</td>
                        <td>{item.fullName}</td>
                        <td>{item.createdAt}</td>
                        <td>{item.stargazersCount}</td>
                        <td>{item.language}</td>
                        <td><a href={item.url}>Access</a></td>
                        <td><button className={this.props.buttonClassName} data-id={item.id} onClick={this.props.onButtonClick}>{this.props.buttonText}</button></td>
                    </tr>))}
                </tbody>
            </table>);
    }
    onSortChange(e) {
        const {columnName, type} = e.target.dataset;
        const { currentSort, currentColumn } = this.state;
        let nextSort;
        if (currentColumn != columnName) nextSort = 'down';
        else if (currentSort === 'down') nextSort = 'up';
        else if (currentSort === 'up') nextSort = 'down';
        else nextSort = 'down';
        let sortFunction;
        if (type === 'string')
        {
            sortFunction = stringSortTypes(columnName)[nextSort].fn            
        }
        else if (type ==='date')
        {
            sortFunction = dateSortTypes(columnName)[nextSort].fn            
        }
        else {
            sortFunction = numericSortTypes(columnName)[nextSort].fn            
        }        
        this.setState({
            currentColumn: columnName,
            currentSort: nextSort,
            sortFunction: sortFunction
        });
    };
}

function dateSortTypes(column) {
    return {
        up: {
            class: 'sort-up',
            fn: (a, b) => new Date(a[column]) - new Date(b[column])
        },
        down: {
            class: 'sort-down',
            fn: (a, b) => new Date(b[column]) - new Date(a[column])
        },
    }
};
function numericSortTypes(column) {
    return {
        up: {
            class: 'sort-up',
            fn: (a, b) => a[column] - b[column]
        },
        down: {
            class: 'sort-down',
            fn: (a, b) => b[column] - a[column]
        },
    }
};
function stringSortTypes(column) {
    return {
        up: {
            class: 'sort-up',
            fn: (a, b) =>  ("" + a[column]).localeCompare(b[column])                
        },
        down: {
            class: 'sort-down',
            fn: (a, b) =>  ("" + b[column]).localeCompare(a[column])                
        },
    }
};
