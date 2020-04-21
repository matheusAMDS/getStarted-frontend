import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"

import Login from "./pages/Login"
import RegisterProgrammer from "./pages/RegisterProgrammer"
import RegisterCompany from "./pages/RegisterCompany"
import Home from "./pages/Home"
import NewJob from "./pages/NewJob"
import Job from "./pages/Job"
import CompanyProfile from "./pages/CompanyProfile"
import ProgrammerProfile from "./pages/ProgrammerProfile"

import { AuthProvider } from "./services/auth"

function App() {
  return (
    <div className="App h-full">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Switch>
            <Route path="/programmer/login">
              <>
                <Login role="Programmer" />
              </>
            </Route>
            <Route path="/company/login">
              <>
                <Login role="Company" />
              </>
            </Route>
            <Route exact path="/">
              <>
                <Redirect to="/jobs" />
              </>
            </Route>
            <Route path="/programmer/register" component={RegisterProgrammer} />
            <Route path="/company/register" component={RegisterCompany} />
            <Route exact path="/jobs" component={Home} />
            <Route exact path="/jobs/job/:id" component={Job} />
            <PrivateRoute exact path="/jobs/new" role="Company" component={NewJob} />
            <Route path="/company/profile/:id" component={CompanyProfile} />
            <Route path="/programmer/profile/:id" component={ProgrammerProfile} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
