import { useAuth } from "../context/AuthContext"
import { Mail, User } from "lucide-react"

export default function ProfileView() {
  const { user } = useAuth()

  if (!user) return null

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          {user.photo ? (
            <img
              src={user.photo}
              alt="profile"
              className="w-[50%] h-[50%] rounded-full object-cover border-4 border-gray-100"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-2xl font-bold">
              {initials}
            </div>
          )}

          <h2 className="text-xl text-center font-semibold">{user.name}</h2>
        </div>

        {/* Info */}
        <div className="space-y-4">

          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <User className="w-4 h-4" />
            <span>
              {user.oauth ? "Google Account" : "Email Account"}
            </span>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t pt-4 text-center text-sm text-gray-400">
          Profile Overview
        </div>

      </div>
    </div>
  )
}