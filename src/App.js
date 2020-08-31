import React from "react";
import {Users} from "./Users";
import {UserForm} from "./UserForm";
import { BrowserRouter as Router, Switch,Route, Link } from "react-router-dom";


export default function App(){
return(
  <Router>
    <div>

    <nav className="topnav">
      <Link className="link" to="/">View Users</Link>
      <Link className="link" id="active" to="/addUser">Add User</Link>
    </nav>

      <Switch>
          <Route path="/addUser" component={UserForm} />
          <Route path="/" component={Users} />
      </Switch>

    </div>
  </Router>
);
}