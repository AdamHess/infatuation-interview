import React from 'react';
import { Link } from 'react-router-dom';

export default class PageHeader extends React.Component {
    constructor(opts) {
        super(opts)
    }
    render() {
        return (
        <header>
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div className="container">                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/">Search Saved Repos</Link>                            
                        </li>
                        <li className="nav-item">
                                <Link className="nav-link text-dark"  to="/github">Search Github</Link>                                                        
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
        );
    }
}