import React, { useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"

import Input from "../components/Input"
import Button from "../components/Button"

import api from "../services/api"
import { AuthContext } from "../services/auth"

export default function Login({ role }) {
  const history = useHistory()
  const { setUser } = useContext(AuthContext)
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const resp = await api.post("/login", {
        email,
        password
      }, {
        params: { role } 
      })
  
      setUser(resp.data)
      history.push("/")
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <form 
      className="container w-full max-w-2xl mx-auto my-16 p-4"
      onSubmit={handleSubmit}
    >
      <h1 className="my-4 text-2xl font-semibold text-center">
        Login 
      </h1>
      
      <Input
        id="login-email"
        type="email"
        placeholder="Email"
        setFunc={setEmail}
      />
      <Input
        id="login-password"
        type="password"
        placeholder="Senha"
        setFunc={setPassword}
      />
      <Button type="submit" text="Login" styles="w-full" />
      
      <Link to={`/${role.toLowerCase()}/register`} className="underline mx-auto text-lg">
        Ainda não está cadastrado? Clique aqui!
      </Link>
    </form>
  )
}