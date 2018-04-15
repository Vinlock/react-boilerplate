import React, { Component } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home } from './routes';
import './App.scss';

class App extends Component {
  renderSwitch = () => (
    <Switch>
      <Route exact component={Home} path="/" />
    </Switch>
  );

  render() {
    return (
      <div role="none" id="cl-app">
        <div id="cl-content">
          {this.renderSwitch()}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null)(App));
