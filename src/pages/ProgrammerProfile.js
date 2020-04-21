import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import api from "../services/api"

export default function ProgrammerProfile() {
  const { id } = useParams()
  const [ programmer, setProgrammer ] = useState(null)

  useEffect(() => {
    async function loadProgrammer() {
      const resp = await api.get(`/programmer/${id}`)

      setProgrammer(resp.data)
    }
    loadProgrammer()  
  }, [id])

  return (
    <main className="container mx-auto bg-white max-w-3xl my-12 rounded shadow-xl p-6">
      { programmer && (
        <>
          <p className="font-semibold text-3xl text-center mb-4">{programmer.name}</p>
          <p>Localidade: {programmer.city} - {programmer.uf}</p>
          <p>Data de Nascimento: {new Date(programmer.birthdate).toLocaleDateString()}</p>
          <p className="flex flex-wrap">Github:&nbsp;
            <a 
              className="font-normal underline" 
              href={programmer.github}
            >
              {programmer.github}
            </a>
          </p>
          <p className="my-2">Habilidades:&nbsp;
            {programmer.skills.map(skill => (
              <Link to={`/jobs?tech=${skill}`}>
                <span 
                  className="px-1 mr-1 border-solid border-green-400 border-2 rounded text-green-400 font-semibold hover:bg-green-400 hover:text-white cursor-pointer"
                  key={skill}
                >
                  {skill}
                </span>
              </Link>
            ))}
          </p>
          
          
          <h2 className="font-semibold text-2xl my-4">Contatos</h2>
          <p className="font-semibold">Email: {programmer.email}</p>
          <p className="font-semibold">Whatsapp:&nbsp;
            <a className="font-normal underline" href={programmer.contact.whatsapp}>
              {programmer.contact.whatsapp}
            </a>
          </p>

          <p className="font-semibold">Facebook:&nbsp;
            <a className="font-normal underline" href={programmer.contact.facebook}>
              {programmer.contact.facebook}
            </a>
          </p>

          <p className="font-semibold">Linkedin:&nbsp;
            <a className="font-normal underline" href={programmer.contact.linkedin}>
              {programmer.contact.linkedin}
            </a>
          </p>

          <p className="font-semibold">Website:&nbsp;
            <a className="font-normal underline" href={programmer.contact.website}>
              {programmer.contact.website}
            </a>
          </p>
          
          <h2 className="font-semibold text-2xl my-4">Descrição do Programador</h2>
          <p>{programmer.description}</p>
        </>
      )}
    </main>
  )
}