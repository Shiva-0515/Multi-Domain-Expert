import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import api from "../services/api"
import toast from "react-hot-toast"
import { User, Lock } from "lucide-react"

/* ───────────── Input Component ───────────── */
function Input({ icon, label, type = "text", value, onChange, error }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`peer w-full pl-10 pr-3 pt-5 pb-2 border rounded-xl bg-white 
        focus:outline-none focus:ring-2 transition-all
        ${
          error
            ? "border-red-400 focus:ring-red-200"
            : "focus:ring-accent/30 focus:border-accent"
        }`}
      />

      <label
        className={`
        absolute left-10 px-1 bg-white transition-all
        top-1/2 -translate-y-1/2 text-sm

        peer-focus:top-0 peer-focus:text-xs
        peer-focus:text-accent

        peer-placeholder-shown:top-1/2
        peer-placeholder-shown:text-sm

        peer-not-placeholder-shown:top-0
        peer-not-placeholder-shown:text-xs

        ${error ? "text-red-500" : "text-gray-400"}
      `}
      >
        {label}
      </label>

      {error && (
        <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>
      )}
    </div>
  )
}

/* ───────────── Main Page ───────────── */
export default function ProfilePage() {
  const { user, checkUser } = useAuth()

  const [form, setForm] = useState({
    name: user?.name || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({})
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)

  /* ───────────── Validation ───────────── */
  const validate = (data) => {
    const e = {}

    if (!data.name.trim()) {
      e.name = "Name is required"
    }

    if (data.newPassword) {
      if (!data.currentPassword) {
        e.currentPassword = "Enter current password"
      }

      if (data.newPassword.length < 6) {
        e.newPassword = "Minimum 6 characters"
      }

      if (data.newPassword !== data.confirmPassword) {
        e.confirmPassword = "Passwords do not match"
      }
    }

    return e
  }

  /* ───────────── Real-time Change ───────────── */
  const handleChange = (field) => (e) => {
    const value = e.target.value

    const updatedForm = {
      ...form,
      [field]: value
    }

    setForm(updatedForm)

    const validationErrors = validate(updatedForm)

    setErrors((prev) => ({
      ...prev,
      [field]: validationErrors[field] || ""
    }))
  }

  /* ───────────── Submit ───────────── */
  const handleUpdate = async () => {
    const validationErrors = validate(form)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error(Object.values(validationErrors)[0])
      return
    }

    const formData = new FormData()

    if (form.name && form.name !== user.name) {
      formData.append("name", form.name)
    }

    if (form.currentPassword) {
      formData.append("currentPassword", form.currentPassword)
    }

    if (form.newPassword) {
      formData.append("newPassword", form.newPassword)
    }

    if (selectedFile) {
      formData.append("file", selectedFile)
    }

    if ([...formData.keys()].length === 0) {
      return toast("No changes to update")
    }

    setLoading(true)

    try {
      const res = await api.patch("/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      toast.success(res.data?.message || "Profile updated 🚀")

      await checkUser()

      setForm(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }))

      setSelectedFile(null)

    } catch (err) {
      toast.error(
        err.response?.data?.detail || "Update failed"
      )
    } finally {
      setLoading(false)
    }
  }

  const isFormInvalid =
    Object.keys(validate(form)).length > 0

  if (!user) return null

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      {/* Avatar */}
      <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6">
        <div className="relative">
          <img
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : user.photo || "https://via.placeholder.com/100"
            }
            className="w-24 h-24 rounded-full object-cover border"
          />

          <label className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 rounded cursor-pointer">
            Edit
            <input
              type="file"
              hidden
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </label>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{user.email}</h2>
          <p className="text-gray-500 text-sm">
            Manage your account settings
          </p>
        </div>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-5">
        <h2 className="text-lg font-semibold">Profile</h2>

        <Input
          icon={<User className="w-4 h-4" />}
          label="Full Name"
          value={form.name}
          onChange={handleChange("name")}
          error={errors.name}
        />
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-5">
        <h2 className="text-lg font-semibold">Edit Password</h2>

        <Input
          icon={<Lock className="w-4 h-4" />}
          label="Current Password"
          type="password"
          value={form.currentPassword}
          onChange={handleChange("currentPassword")}
          error={errors.currentPassword}
        />

        <Input
          icon={<Lock className="w-4 h-4" />}
          label="New Password"
          type="password"
          value={form.newPassword}
          onChange={handleChange("newPassword")}
          error={errors.newPassword}
        />

        <Input
          icon={<Lock className="w-4 h-4" />}
          label="Confirm Password"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
          error={errors.confirmPassword}
        />
      </div>

      {/* Save */}
      <button
        onClick={handleUpdate}
        disabled={loading || isFormInvalid}
        className="w-full bg-accent text-white py-3 rounded-xl disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

    </div>
  )
}