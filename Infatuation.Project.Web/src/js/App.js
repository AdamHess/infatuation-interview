import React from 'react';
import PageHeader from './PageHeader';
import {
  Switch,
  Route,
  HashRouter,
} from 'react-router-dom';
import AppMain from './AppMain';
import SavedRepos from './SavedRepos';
import GithubSearch from './GithubSearch';

class App extends React.Component {
  constructor(opts) {
    super(opts);
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/github">
            <PageHeader />
            <AppMain>
              <GithubSearch />
            </AppMain>
          </Route>
          <Route path="/">
            <PageHeader />
            <AppMain>
              <SavedRepos />
            </AppMain>
          </Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
