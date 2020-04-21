import React from "react"

export default function Button({ text, type, onClick, disabled, styles }) {
  return (
    <button
      className={`bg-green-500 rounded p-2 my-3 font-semibold ${styles} ${disabled ? "hidden" : ""}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  )
}