
import React from 'react';
export default class AppMainContainer extends React.Component {
    render() {
        return (
            <div class="container">
                <main role="main" class="pb-3">
                    {this.props.children}
                </main>
            </div>
        );
    }
}
