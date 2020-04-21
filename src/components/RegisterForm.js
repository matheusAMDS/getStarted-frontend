import React, { useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"

import Input from "../components/Input"
import Button from "../components/Button"

import api from "../services/api"
import { AuthContext } from "../services/auth"

export default function Register({ role, states, children }) {
  const history = useHistory()
  const { setUser } = useContext(AuthContext)

  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ city, setCity ] = useState("")
  const [ uf, setUf ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ linkedin, setLinkedin ] = useState("")
  const [ facebook, setFacebook ] = useState("")
  const [ whatsapp, setWhatsapp ] = useState("")
  const [ website, setWebsite ] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const resp = await api.post("/register", {
        name,
        email,
        password,
        city,
        uf,
        description,
        ...states,
        contact: {
          facebook,
          whatsapp,
          linkedin,
          website
        }
      }, {
        params: { role } 
      })
  
      setUser(resp.data)
      history.push("/jobs")
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <form 
      className="container w-full max-w-2xl mx-auto my-6 p-4"
      onSubmit={handleSubmit}
    >
      <h1 className="my-4 text-2xl font-semibold text-center">
        Cadastrar {role === "Company" ? "Empresa" : "Programador"}
      </h1>
      
      <Input placeholder="Nome" setFunc={setName} />
      <Input
        type="email"
        placeholder="Email"
        setFunc={setEmail}
      />
      <Input
        type="Senha"
        placeholder="Password"
        setFunc={setPassword}
      />

      <div className="flex flex-row flex-nowrap">
        <Input placeholder="Cidade" setFunc={setCity} />
        <Input placeholder="UF" setFunc={setUf} />
      </div>

      <Input
        type="textarea"
        placeholder={`Descrição ${
          role === "Programmer" ? "do programador" : "da empresa"
        }`}
        setFunc={setDescription}
      />

      {children}

      <div className="flex flex-row flex-nowrap">
        <Input placeholder="Website (opcional)" setFunc={setWebsite} />
        <Input placeholder="Facebook (opcional)" setFunc={setFacebook} />
      </div>
      
      <div className="flex flex-row flex-nowrap">
        <Input placeholder="Linkedin (opcional)" setFunc={setLinkedin} />
        <Input placeholder="Whatsapp (opcional)" setFunc={setWhatsapp} />
      </div>
      
      <Button type="submit" text="Cadastrar" styles="w-full" />

      <Link to={`/${role.toLowerCase()}/login`} 
        className="underline mx-auto text-lg text-center"
      >
        Já está cadastrado? Clique aqui!
      </Link>
    </form>
  )
}