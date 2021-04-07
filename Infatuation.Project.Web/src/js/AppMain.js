
import React from 'react';
export default class AppMainContainer extends React.Component {
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
