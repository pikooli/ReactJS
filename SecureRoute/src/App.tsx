import React, {useState} from 'react';
import {BrowserRouter as Router, Link, Switch, Route, Redirect, useLocation, useHistory} from "react-router-dom"
import {Public, Login, Protected} from "./Secure/Page"
import fakeAuth from "./Secure/fakeAuth"

interface props {
  children : any
  path : any
}

function PrivateRoute({children , ...rest} : props){
  return (
    <Route {...rest} render={({location}) => {
      return fakeAuth.isAuthenticated === true
      ? children :
      <Redirect to={{
        pathname :"/login",
        state : {from : location}
      }}
      />
    }}
    />    
  )
}


function AuthButton (){
  const history = useHistory()
  return fakeAuth.isAuthenticated === true ? 
  <p>
    Welcome ! <button onClick={() => {
      fakeAuth.signout(() => history.push("/"))
    }}>Sign out</button>
  </p>
  : <p>You are not legged in.</p>
}

function App() {

  return (
    <Router>
      <div>
        <AuthButton/>
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>
        <Route path="/public" component={Public}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/protected">
          <Protected/>
        </PrivateRoute>
        
      </div>
    </Router>
  )
}


export default App;
