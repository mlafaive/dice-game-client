import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Paths } from './constants';
import Home from './components/home';
import NewGame from './components/new-game';
import Game from './components/game';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={Paths.Home} children={<Home />} />
        <Route path={Paths.NewGame} children={<NewGame />} />
        <Route path={Paths.Games} children={<Game />} />
        <Route path="*"><Redirect to={Paths.Home} /></Route>
      </Switch>
    </Router>
  );
}
