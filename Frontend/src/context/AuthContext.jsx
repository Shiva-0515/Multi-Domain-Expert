import { createContext, useContext, useState, useEffect } from "react"
import api from "../services/api"
import toast from "react-hot-toast"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔎 Check session
  const checkUser = async () => {
    try {
      const res = await api.get("/auth/me")

      if (res.data.authenticated) {
        setUser(res.data.user)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  // 🔐 LOGIN
  const login = async ({ email, password }, options = {}) => {
    const { silent = false } = options

    try {
      await api.post("/auth/login", { email, password })

      await checkUser()

      if (!silent) {
        toast.success("Welcome back 🎉")
      }

    } catch (err) {
      if (!silent) {
        toast.error(
          err.response?.data?.detail || "Login failed"
        )
      }
      throw err
    }
  }

  // 📝 SIGNUP
  const signup = async ({ fullName, email, password }) => {
    try {
      await api.post("/auth/signup", {
        name: fullName,
        email,
        password,
      })

      toast.success("Account created successfully 🚀")

      // 🔐 Silent login to avoid double toast
      await login({ email, password }, { silent: true })

      // Optional: show one clean message instead
      toast.success("Logged in successfully 🎉")

    } catch (err) {
      toast.error(
        err.response?.data?.detail || "Signup failed"
      )
    }
  }

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      await api.post("/auth/logout")
      setUser(null)
      toast.success("Logged out successfully 👋")
    } catch {
      toast.error("Logout failed")
    }
  }

  // 🌐 GOOGLE LOGIN
  const loginWithGoogle = () => {
    toast("Redirecting to Google...", { icon: "🔗" })
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        loginWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}