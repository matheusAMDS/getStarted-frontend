import React, { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const initialUser = JSON.parse(localStorage.getItem("user"))
  const [ user, setUser ] = useState(initialUser)

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user))
  }, [user])

  function isLoggedIn(role) {
    if (role)
      return user !== null ? user.role === role : false
    return user !== null
  }

  const authValues = {
    user,
    setUser,
    isLoggedIn,
    logout: () => setUser(null)
  }

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  )
}