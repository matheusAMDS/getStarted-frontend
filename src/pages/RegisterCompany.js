import React, { useState } from "react"

import RegisterForm from "../components/RegisterForm"
import Input from "../components/Input"

export default function RegisterCompany() {
  const [ address, setAddress ] = useState("")

  return (
    <RegisterForm
      role="Company"
      states={{ address }}
    >
      <Input
        placeholder="Endereço da empresa"
        setFunc={setAddress}
      />
      
    </RegisterForm>
  )
}