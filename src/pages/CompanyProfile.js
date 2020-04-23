import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import JobCard from "../components/JobCard"

import api from "../services/api"

export default function CompanyProfile() {
  const { id } = useParams()
  const [ company, setCompany ] = useState(null)
  const [ jobs, setJobs ] = useState([])

  useEffect(() => {
    async function loadCompany() {
      const company = await api.get(`/company/${id}`)
      const jobs = await api.get(`/company/jobs/${id}`)

      setCompany(company.data)
      setJobs(jobs.data)
    }

    loadCompany()
  }, [id])

  return (
    <main className="container mx-auto max-w-3xl my-6 p-3">
      { company &&
        <>
          <div className="w-full bg-white mb-6 p-4 rounded shadow-xl">
            <p className="font-semibold text-3xl text-center mb-4">{company.name}</p>
            <p>Endereço: {company.address}, {company.city} - {company.uf}</p>
            
            <h2 className="font-semibold text-2xl my-4">Contatos</h2>
            <p className="font-semibold">Email: {company.email}</p>
            <p className="font-semibold">Whatsapp:&nbsp;
              <a className="font-normal underline" href={company.contact.whatsapp}>
                {company.contact.whatsapp}
              </a>
            </p>

            <p className="font-semibold">Facebook:&nbsp;
              <a className="font-normal underline" href={company.contact.facebook}>
                {company.contact.facebook}
              </a>
            </p>

            <p className="font-semibold">Linkedin:&nbsp;
              <a className="font-normal underline" href={company.contact.linkedin}>
                {company.contact.linkedin}
              </a>
            </p>

            <p className="font-semibold">Website:&nbsp;
              <a className="font-normal underline" href={company.contact.website}>
                {company.contact.website}
              </a>
            </p>
            
            <h2 className="font-semibold text-2xl my-4">Descrição da Empresa</h2>
            <p>{company.description}</p>
          </div>

          { jobs && (
            <div>
              <h2 className="font-semibold text-2xl my-4 text-center">Vagas</h2>
              <div>
                {jobs.map(job => (
                  <JobCard job={job} key={job._id} />
                ))}
              </div>
            </div>
          )}

        </>
      }
    </main>
    
  )
}
