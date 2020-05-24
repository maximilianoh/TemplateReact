import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import WhatComponentRender from './WhatComponentRender';


export default function RenderComponent() {
  return (
    <Router>
      <Switch>
        <Route exact path="/**" render={(routeProps) => (WhatComponentRender(routeProps))} />
      </Switch>
    </Router>
  );
}


ReactDOM.render(<RenderComponent />, document.getElementById('app'));
