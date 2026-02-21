import { createContext, useContext, useState, useEffect } from "react"
import api from "../services/api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔎 Check session
  const checkUser = async () => {
  try {
    console.log("Checking user...")
    const res = await api.get("/auth/me")
    console.log("ME response:", res.data)

    if (res.data.authenticated) {
      setUser(res.data.user)
    } else {
      setUser(null)
    }
  } catch (err) {
    console.log("ME error:", err)
    setUser(null)
  } finally {
    setLoading(false)
  }
}


  useEffect(() => {
    checkUser()
  }, [])

  // 🔐 LOGIN
  const login = async ({ email, password }) => {
    await api.post("/auth/login", { email, password })
    await checkUser()
  }

  // 📝 SIGNUP
  const signup = async ({ fullName, email, password }) => {
    await api.post("/auth/signup", { name:fullName, email, password })
    await login({ email, password })
  }

  // 🚪 LOGOUT
  const logout = async () => {
    await api.post("/auth/logout")
    setUser(null)
  }

  const loginWithGoogle = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
}
  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
