import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"

import Input from "../components/Input"
import Button from "../components/Button"

import api from "../services/api"
import { AuthContext } from "../services/auth"

export default function NewJob() {
  const history = useHistory()
  const { user } = useContext(AuthContext)

  const [ title, setTitle ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ requirements, setRequirements ] = useState("")
  const [ salary, setSalary ] = useState(0)
  const [ remote, setRemote ] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await api.post("/jobs/store", {
        title,
        description,
        requirements: requirements.split(",").map(req => req.trim()),
        salary: Number(salary),
        is_remote: remote
      }, {
        headers: {
          authorization: `Bearer ${user.token}`
        }
      })

      history.push("/jobs")
    } catch (error) {
      alert("Não foi possível concluir o processo!")
    }
  }

  return (
    <main className="container w-full mx-auto max-w-3xl my-6 p-3">
      <h1 className="font-semibold text-2xl text-center mb-4">Abrir vaga</h1>

      <form className="w-full" onSubmit={handleSubmit}>
        <Input placeholder="Título da vaga" setFunc={setTitle} />

        <Input 
          type="textarea" 
          placeholder="Descrição da vaga" 
          setFunc={setDescription} 
        />

        <Input
          placeholder="Requisitos mínimos. Ex: NodeJS, ReactJS, ..."
          setFunc={setRequirements}
        />

        <Input
          placeholder="Salario por mês"
          setFunc={setSalary}
        />

        <div className="flex w-full my-3 mx-auto items-center justify-around">
          <p className="font-semibold text-md">A vaga é remota?</p>
          
          <div className="flex items-center">
            <label htmlFor="yes">Sim</label>
            <input
              className="ml-2"
              type="radio"
              id="yes"
              name="is_remote"
              value={true}
              onChange={() => setRemote(true)}
            />
          </div>
          
          <div className="flex items-center">
            <label htmlFor="no">Não</label>
            <input
              className="ml-2"
              type="radio"
              id="no"
              name="is_remote"
              value={false}
              onChange={() => setRemote(false)}
            />
          </div>
          
        </div>

        <Button type="submit" text="Concluir" styles="w-full" />
      </form>
    </main>
  )
}