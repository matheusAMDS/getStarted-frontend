import React, { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import queryString from "query-string"

import Input from "../components/Input"
import Button from "../components/Button"
import JobCard from "../components/JobCard"

import api from "../services/api"

export default function Home() {
  const history = useHistory()
  const { tech } = queryString.parse(useLocation().search)
  
  const [ jobs, setJobs ] = useState([])
  const [ page, setPage ] = useState(1)
  const [ techInput, setTechInput ] = useState("")

  function searchByTech(e) {
    e.preventDefault()
    history.push(`/jobs?tech=${techInput}`)
  }

  async function loadJobs() {
    const resp = await api.get("/jobs", { 
      params: { tech, page } 
    })
    
    setJobs(jobs.concat(resp.data.docs))
    setPage(resp.data.nextPage)
  }

  useEffect(() => {
    async function loadJobsByTech() {
      const resp = await api.get("/jobs", {
        params: { 
          tech, 
          page: 1
        }
      })
  
      setJobs(resp.data.docs)
      setPage(resp.data.nextPage)
    }
    
    window.scrollTo(0, 0)
    loadJobsByTech() 
  }, [ tech ])

  return (
    <main className="container w-full mx-auto max-w-3xl mb-12 p-3">
      <h1 className="font-semibold text-3xl text-center my-5">
        Vagas Disponíveis
      </h1>

      <form className="flex mb-2 w-full" onSubmit={searchByTech}>
        <Input placeholder="Pesquise por tecnologia" setFunc={setTechInput} />
        <Button type="submit" text="Pesquisar" styles="ml-2" />
      </form>
      
      <ul className="w-full">
        {jobs.map(job => <JobCard job={job} key={job._id}/> )}
      </ul>
      
      <Button 
        onClick={loadJobs} 
        text='Carregar mais' 
        disabled={!page} 
        styles='w-full' 
      />
    </main>
  )
}