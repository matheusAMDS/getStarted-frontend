import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"

import { AuthContext } from "../services/auth"

export default function PrivateRoute({ component: Component, role, ...rest }) {
  const { user, isLoggedIn } = useContext(AuthContext)

  function roleAlert(props) {
    const x = role === "Company" ? "empresa" : "programador"
    alert(`Você não está logado em uma conta de ${x} para realizar tal tarefa!`)

    return (
      <Redirect to={{ 
        pathname: `/jobs`, 
        state: { from: props.location }
      }} />
    )
  }
  
  return (
    <Route {...rest} render={props =>
      (isLoggedIn() ? user.role === role : false)
        ? <Component {...props} />
        : roleAlert(props)
      } 
    />
  )
}