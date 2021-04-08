import React from 'react';
import PropTypes from 'prop-types';

import {format} from 'date-fns';


export default class SharedButtonedTable extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: propTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      stargazersCount: PropTypes.number.isRequired,
      language: PropTypes.string,
      url: PropTypes.string.isRequired,
      onButtonClick: PropTypes.function.isRequired,

    })),
    buttonClassName: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    onButtonClick: PropTypes.function.isRequired,
  };
  constructor(opts) {
    super(opts);
    this.refTable = React.createRef();
    this.state = {
      sortFunction: sortTypes().down.numericFn,
      currentColumn: 'id',
    };
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
            <th>
              <a onClick={this.onSortChange} data-column-name="id">
                Id
                <ColumnSortIndicator
                  column="id"
                  sortColumn={this.state.currentColumn}
                  direction={this.state.currentSortClass} />
              </a>
            </th>
            <th>
              <a onClick={this.onSortChange} data-column-name="fullName" data-type="string">
                Full Name
                <ColumnSortIndicator
                  column="fullName"
                  sortColumn={this.state.currentColumn}
                  direction={this.state.currentSortClass} />
              </a>
            </th>
            <th>
              <a onClick={this.onSortChange} data-column-name="createdAt" data-type="date">
                Created At
                <ColumnSortIndicator
                  column="createdAt"
                  sortColumn={this.state.currentColumn}
                  direction={this.state.currentSortClass} />
              </a>
            </th>
            <th>
              <a onClick={this.onSortChange} data-column-name="stargazersCount">
                Stargazers
                <ColumnSortIndicator
                  column="stargazersCount"
                  sortColumn={this.state.currentColumn}
                  direction={this.state.currentSortClass} />
              </a>
            </th>
            <th>
              <a onClick={this.onSortChange} data-column-name="language" data-type="string">
                Language
                <ColumnSortIndicator
                  column="language"
                  sortColumn={this.state.currentColumn}
                  direction={this.state.currentSortClass} />
              </a>
            </th>
            <th>Link</th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {this.props.items.sort(this.state.sortFunction).map((item, index) =>
            (<tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.fullName}</td>
              <td>{format(new Date(item.createdAt), 'MM/dd/yyyy')}</td>
              <td>{item.stargazersCount}</td>
              <td>{item.language}</td>
              <td><a href={item.url}>Access</a></td>
              <td>
                <button
                  className={this.props.buttonClassName}
                  data-id={item.id}
                  onClick={this.props.onButtonClick}>
                  {this.props.buttonText}</button>
              </td>
            </tr>))}
        </tbody>
      </table>);
  }
  onSortChange(e) {
    const {columnName, type} = e.target.dataset;
    const {currentSort, currentColumn} = this.state;
    let nextSort;
    if (currentColumn != columnName) nextSort = 'down';
    else if (currentSort === 'down') nextSort = 'up';
    else if (currentSort === 'up') nextSort = 'down';
    else nextSort = 'down';
    let sortFunction;

    const sortColumnObj = sortTypes(columnName)[nextSort];
    if (type === 'string') {
      sortFunction = sortColumnObj.stringFn;
    } else if (type === 'date') {
      sortFunction = sortColumnObj.dateFn;
    } else {
      sortFunction = sortColumnObj.numericFn;
    }

    this.setState({
      currentColumn: columnName,
      currentSort: nextSort,
      sortFunction: sortFunction,
      currentSortClass: sortColumnObj.class,
    });
  };
}


function sortTypes(column) {
  return {
    up: {
      class: 'sort-up',
      stringFn: (a, b) => ('' + a[column]).localeCompare(b[column]),
      dateFn: (a, b) => new Date(a[column]) - new Date(b[column]),
      numericFn: (a, b) => a[column] - b[column],
    },
    down: {
      class: 'sort-down',
      stringFn: (a, b) => ('' + b[column]).localeCompare(a[column]),
      dateFn: (a, b) => new Date(b[column]) - new Date(a[column]),
      numericFn: (a, b) => b[column] - a[column],
    },
  };
};


class ColumnSortIndicator extends React.Component {
  static propTypes = {
    sortColumn: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
  }
  constructor(opts) {
    super(opts);
  }
  render() {
    if (this.props.column == this.props.sortColumn) {
      return (<i className={`fas fa-${this.props.direction}`} />);
    }
    return null;
  }
}


