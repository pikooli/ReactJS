import React from 'react';
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"

const About = () => <h3>About</h3>
const Users = () => <h3>Users</h3>
const Home = () => <h3>Home</h3>

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to ="/">Home</Link>
            </li>
            <li>
              <Link to ="/about">About</Link>
            </li>
            <li>
              <Link to ="/users">users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
            <Route path="/about">
                <About/>
            </Route>
            <Route path="/users">
                <Users/>
            </Route>
            <Route path="/">
                <Home/>
            </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
