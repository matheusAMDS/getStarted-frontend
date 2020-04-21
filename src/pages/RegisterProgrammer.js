import React, { useState } from "react"

import RegisterForm from "../components/RegisterForm"
import Input from "../components/Input"

export default function RegisterProgrammer() {
  const [ birthdate, setBirthdate ] = useState("")
  const [ skills, setSkills ] = useState("")
  const [ github, setGithub ] = useState("")

  return (
    <RegisterForm
      role="Programmer"
      states={{
        birthdate,
        skills: skills.split(",").map(skill => skill.trim()),
        github
      }}
    >
      <Input 
        placeholder="Data de Nascimento (dd/mm/aaaa)"
        setFunc={setBirthdate}
      />
      <Input
        placeholder="Algumas das suas habilidades. Ex.: NodeJS"
        setFunc={setSkills}
      />
      <Input
        placeholder="Github (Obrigatório para se candidatar às vagas)"
        setFunc={setGithub}
      />
    </RegisterForm>
  )
}