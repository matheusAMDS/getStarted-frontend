import React from "react"

export default function Input({ id, type, placeholder, setFunc }) {
  if (type === "textarea")
    return (
      <textarea
        className="w-full mx-auto py-2 px-4 my-3 mx-4 rounded border border-gray-300"
        id={id}
        placeholder={placeholder}
        rows="20"
        onChange={e => setFunc(e.target.value)}
      />
    )
  return (
    <input 
      className="w-full mx-auto py-2 px-4 my-3 mx-4 rounded border border-gray-300"
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={e => setFunc(e.target.value)}
    />
  )
}