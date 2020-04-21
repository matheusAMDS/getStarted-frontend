import React, { useState } from "react"
import Button from "./Button"
import { Link } from "react-router-dom"

export default function DropdownButton({ text, options, disabled, styles }) {
  const [ show, setShow ] = useState(false)

  return (
    <div className={`relative ${disabled ? "hidden" : ""} ${styles}`}>
      <Button
        styles="w-full"
        text={text}
        onClick={() => setShow(!show)}
      />
      <ul 
        className={`bg-white w-full absolute ${show ? "block" : "hidden"}`}
        onClickCapture={() => setShow(false)}
      >
        {options.map(option => (
          <Link
            key={option.name}
            to={option.to}
            className="block text-center border-gray-700 hover:bg-gray-400 py-1"
          >
            {option.name}
          </Link>
        ))}
      </ul>
    </div>
  )
}