import React, {useState} from 'react';
import {BrowserRouter as Router, Link, Switch, Route, Redirect, useLocation} from "react-router-dom"
import fakeAuth from "./fakeAuth"

export const Public = ()=> <h3>public</h3>
export const Protected = ()=> <h3>Protected</h3>

export function Login(){
  const [
    redirectToReferrer,
    setRedirectToReferrer
  ] = useState(false)

  const { state } : any  = useLocation()

  const login = () => fakeAuth.authenticate(() => {
    setRedirectToReferrer(true)
  })

  if (redirectToReferrer === true) return <Redirect to={ state?.from || "/"}/>
  return(
    <div>
      <p>You must log in to view the page</p>
      <button onClick={login}>Log in</button>
    </div>
  )
}