
import React from 'react';
import PropTypes from 'prop-types';
export default class AppMainContainer extends React.Component {
  static propTypes = {
    children: PropTypes.ReactComponentLike,
  }
  render() {
    return (
      <div className="container">
        <main role="main" className="pb-3">
          {this.props.children}
        </main>
      </div>
    );
  }
}
