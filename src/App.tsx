import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Topnav from './components/Topnav';
import Table from './components/Table';
import Details from './components/Details';
import About from './components/About';
import Map from './components/Map';
import Originals from './components/Originals';
import './icons';

import './App.scss';

function App () {
  return (
    <Router>
      <Topnav/>
      <Container fluid>
        <Switch>
          <Route exact path="/">
            <Table/>
          </Route>
          <Route exact path="/map">
            <Redirect to="/locations" />
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/locations">
            <Map/>
          </Route>
          <Route path="/originals">
            <Originals/>
          </Route>
          <Route path="/:id">
            <Details/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
