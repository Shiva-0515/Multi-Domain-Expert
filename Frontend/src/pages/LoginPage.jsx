import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loginWithGoogle, loginWithGitHub } = useAuth()

  const from = location.state?.from?.pathname || '/analyze'

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'At least 6 characters'
    return e
  }

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((er) => ({ ...er, [field]: '' }))
    setApiError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
  console.log("Before login")
  await login({ email: form.email, password: form.password })
  console.log("Login successful")
  navigate(from, { replace: true })
} catch (err) {
  console.log("Login failed:", err)
  setApiError(err.message || 'Login failed. Please try again.')
}

  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">

      {/* ── Left decorative panel ── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 bg-accent overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-mid rounded-full blur-3xl opacity-40" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-soft inline-block" />
            Multi-Domain AI Expert
          </div>
          <h2 className="font-display text-4xl font-bold text-white leading-tight mb-4">
            Research-grade<br />
            <em className="font-normal not-italic opacity-80">insights, instantly.</em>
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Finance and medical expertise powered by specialized AI — structured, evidence-backed reports on demand.
          </p>
        </div>

        <div className="relative space-y-3">
          {[
            { icon: '📈', text: 'Finance & investment analysis' },
            { icon: '🩺', text: 'Medical & clinical insights' },
            { icon: '⚡', text: 'Reports in under 30 seconds' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 text-white/70 text-sm">
              <span className="text-base">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-fade-up">

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-ink mb-2">Welcome back</h1>
            <p className="text-ink-muted text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-accent font-medium hover:text-accent-mid transition-colors">
                Sign up free
              </Link>
            </p>
          </div>

          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={loginWithGoogle}
              className="flex items-center justify-center gap-2.5 px-4 py-3 bg-paper border border-paper-border rounded-xl text-sm font-medium text-ink hover:bg-paper-warm hover:border-ink/20 transition-all duration-200 active:scale-[0.98]"
            >
              <GoogleIcon />
              Google
            </button>
            <button
              type="button"
              onClick={loginWithGitHub}
              className="flex items-center justify-center gap-2.5 px-4 py-3 bg-paper border border-paper-border rounded-xl text-sm font-medium text-ink hover:bg-paper-warm hover:border-ink/20 transition-all duration-200 active:scale-[0.98]"
            >
              <GitHubIcon />
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-paper-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-paper px-3 text-xs text-ink-muted">or continue with email</span>
            </div>
          </div>

          {/* API error */}
          {apiError && (
            <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3.5 animate-fade-in">
              <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-red-700">{apiError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-xl border text-sm text-ink placeholder:text-ink-muted/50 bg-paper focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent transition-all duration-200 ${
                  errors.email ? 'border-red-300 bg-red-50/30' : 'border-paper-border'
                }`}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  Password
                </label>
                {/* 🔌 PLACEHOLDER: Wire to /api/auth/forgot-password */}
                <button
                  type="button"
                  className="text-xs text-accent hover:text-accent-mid transition-colors"
                  onClick={() => alert('🔌 Placeholder: Wire up forgot password flow')}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange('password')}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm text-ink placeholder:text-ink-muted/50 bg-paper focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent transition-all duration-200 ${
                    errors.password ? 'border-red-300 bg-red-50/30' : 'border-paper-border'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
                  tabIndex={-1}
                >
                  {showPassword
                    ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  }
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-accent text-paper rounded-xl font-medium text-sm hover:bg-accent-mid transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md active:scale-[0.99] mt-2"
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </>
              ) : 'Sign in'}
            </button>
            <div className='text-center'>
                <label className="w-full mt-2 text-xs text-ink-muted">Don't have an account? <button className="text-accent hover:text-accent-mid transition-colors" 
            onClick={() => navigate('/signup')}>Sign up</button></label>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-ink-muted/60">
            By signing in you agree to our{' '}
            <button className="underline hover:text-ink-muted transition-colors" onClick={() => alert('🔌 Placeholder: Link to Terms page')}>Terms</button>
            {' '}and{' '}
            <button className="underline hover:text-ink-muted transition-colors" onClick={() => alert('🔌 Placeholder: Link to Privacy page')}>Privacy Policy</button>
          </p>
        </div>
      </div>
    </div>
  )
}