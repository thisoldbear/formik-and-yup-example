import * as React from "react";
import ReactDOM from "react-dom";
import { Form as ExampleOne } from "./basicForm"
import { Form as ExampleTwo } from "./validationForm"
import { Form as ExampleThree } from "./validationFunction"
import { Form as ExampleFour } from "./yupValidation"
import { Form as ExampleFive } from "./formFromConfig"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './styles.scss';

ReactDOM.render(
  <Router>
    <ul>
      <li>
        <Link to="/">Example One</Link>
      </li>
      <li>
        <Link to="/example-two">Example Two</Link>
      </li>
      <li>
        <Link to="/example-three">Example Three</Link>
      </li>
      <li>
        <Link to="/example-four">Example Four</Link>
      </li>
      <li>
        <Link to="/example-five">Example Five</Link>
      </li>
    </ul>
    <Switch>
      <Route path="/example-five">
        <ExampleFive />
      </Route>
      <Route path="/example-four">
        <ExampleFour />
      </Route>
      <Route path="/example-three">
        <ExampleThree />
      </Route>
      <Route path="/example-two">
        <ExampleTwo />
      </Route>
      <Route path="/">
        <ExampleOne />
      </Route>
    </Switch>
  </Router>
  , document.getElementById("root")
);
