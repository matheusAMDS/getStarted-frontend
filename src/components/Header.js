import React, { useContext } from "react"
import { useHistory, Link } from "react-router-dom"

import Button from "../components/Button"
import DropdownButton from "../components/DropdownButton"

import { AuthContext } from "../services/auth"

export default function Header() {
  const history = useHistory()
  const { isLoggedIn, logout, user } = useContext(AuthContext)

  function handleLogout() {
    logout()
    history.push("/jobs")
  }

  return (
    <header className="bg-gray-900 py-2 flex flex-row flex-wrap justify-around items-center">
      <Link to="/jobs" className="text-3xl mr-2">
        <span className="text-green-500">getStarted</span>
        <span className="text-white font-semibold">()</span>
      </Link>
      
      <nav className="flex justify-center items-center w-full max-w-lg md:justify-end md:flex-row">
        <DropdownButton
          disabled={isLoggedIn()}
          text="Login"
          styles="w-32 mx-2"
          options={[
            { name: "Programador", to: "/programmer/login"},
            { name: "Empresa", to: "/company/login"}
          ]}
        />
        <DropdownButton
          disabled={isLoggedIn()}
          styles="w-32 mx-2"
          text="Register"
          options={[
            { name: "Programador", to: "/programmer/register"},
            { name: "Empresa", to: "/company/register"}
          ]}
        />
        <Button
          disabled={!isLoggedIn()}
          text="Perfil"
          styles="w-24 mx-2"
          onClick={() => history.push(`/${user.role.toLowerCase()}/profile/${user.user._id}`)}
        />
        <Button
          disabled={!isLoggedIn("Company")}
          text="Abrir vaga"
          styles="w-24 mx-2"
          onClick={() => history.push("/jobs/new")}
        />
        <Button
          disabled={!isLoggedIn()}
          text="Sair"
          styles="w-20 mx-2"
          onClick={handleLogout}
        />
      </nav>
    </header>
  )
}
