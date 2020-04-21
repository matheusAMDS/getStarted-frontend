import React, { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"

import Input from "../components/Input"
import Button from "../components/Button"
import JobCard from "../components/JobCard"

import api from "../services/api"

export default function Home() {
  const history = useHistory()
  const tech = new URLSearchParams(useLocation().search).get("tech")
  
  const [ jobs, setJobs ] = useState([])
  const [ techInput, setTechInput ] = useState("")

  function searchByTech(e) {
    e.preventDefault()
    history.push("/jobs?tech="+techInput)
  }
  
  useEffect(() => {
    async function loadJobs() {
      const resp = await api.get("/jobs", { 
        params: { tech } 
      })

      setJobs(resp.data.docs)
    }
    loadJobs()
  }, [ tech ])

  return (
    <main className="container mx-auto max-w-3xl mb-12">
      <h1 className="font-semibold text-3xl text-center my-5">Vagas Disponíveis</h1>
      <form className="flex mb-2 w-full" onSubmit={searchByTech}>
        <Input placeholder="Pesquise por tecnologia" setFunc={setTechInput} />
        <Button type="submit" text="Pesquisar" styles="ml-2" />
      </form>
      
      <ul className="w-full">
        {jobs.map(job => (
          <JobCard job={job} key={job._id}/>
        ))}
      </ul>
    </main>
  )
}