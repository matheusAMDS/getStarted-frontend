import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory, Link } from "react-router-dom"

import JobCard from "../components/JobCard"
import Button from "../components/Button"

import api from "../services/api"
import { AuthContext } from "../services/auth"

export default function Job() {
  const { id } = useParams()
  const history = useHistory()
  const { user, isLoggedIn } = useContext(AuthContext)

  const [ job, setJob ] = useState(null)

  // Aplica à uma vaga (Programador)
  async function jobApply() {
    try {
      await api.put(`/jobs/apply/${id}`,{}, {
        headers: {
          authorization: `Bearer ${user.token}`
        }
      })
      alert("Agora você está concorrendo à vaga!")
      history.push("/jobs")
    } catch (error) {
      alert("Você já está concorrendo à vaga")
    }
  }

  // Encerrar uma vaga (Empresa)
  async function endJob() {
    await api.delete(`/jobs/close/${id}`, {
      headers: {
        authorization: `Bearer ${user.token}`
      } 
    })
    
    history.push("/jobs")
  }

  useEffect(() => {
    async function loadJob() {
      const resp = await api.get(`/jobs/${id}`)

      setJob(resp.data)
    }

    loadJob()
  }, [id])

  return (
    <main className="container mx-auto my-12 max-w-3xl">
      { job && (
        <JobCard job={job}>
          <hr className="mt-6 mb-2"/>
          <h2 className="text-xl font-semibold mt-4">Descrição da vaga</h2>
          <p className="m-3 whitespace-pre-wrap">{job.description}</p>
          <h2 className="text-xl font-semibold mt-4">Descrição da empresa</h2>
          <p className="m-3 whitespace-pre-wrap">{job.by_company.description}</p>

          <h2 className="text-xl font-semibold mt-4">Interessados na vaga</h2>
          <div className="w-full my-4 mx-auto">
            {job.interested.map(dev => (
              <div className="w-full">
                <hr className="mb-3"/>
                <Link 
                  to={`/programmer/profile/${dev._id}`} 
                  className="font-semibold text-lg mx-3 text-gray-700"
                >
                  {dev.name}
                </Link>
                <p className="mx-4 whitespace-pre-wrap mb-3">{dev.description}</p>
              </div>
            ))}
          </div>

          <hr className="mt-2 mb-6"/>

          { isLoggedIn("Company") && job.by_company._id === user.user._id ?
            <Button text="Encerrar vaga" styles="w-full" onClick={endJob} />
            : null
          }

          { isLoggedIn("Programmer") ? 
            <Button text="Aplicar" styles="w-full" onClick={jobApply} />
            : null
          }
        </JobCard>
      )}
    </main>
  )
}