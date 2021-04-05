import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SavedRepos from './SavedRepos';
import GithubSearch from './GithubSearch';

class App extends React.Component {
  constructor(opts) {
  super(opts);
  }
  render() {

    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Search Saved Repos</Link>
              </li>
              <li>
                <Link to="/github">Search Github</Link>
              </li>
            </ul>
          </nav>
  
          
          <Switch>
            <Route path="/github">
              <GithubSearch />
            </Route>            
            <Route path="/">
              <SavedRepos />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
