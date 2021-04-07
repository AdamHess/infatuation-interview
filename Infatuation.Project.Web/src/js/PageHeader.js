import React from 'react';
import { Link } from 'react-router-dom';

export default class PageHeader extends React.Component {
    constructor(opts) {
        super(opts)
    }
    render() {
        return (
        <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container">                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                    <ul class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <Link className="nav-link text-dark" to="/">Search Saved Repos</Link>                            
                        </li>
                        <li class="nav-item">
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