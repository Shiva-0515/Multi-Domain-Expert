import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const initials = user.name
    ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : user.email[0].toUpperCase()

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-paper-border hover:bg-paper-warm transition-all duration-200"
      >
        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
          <span className="text-paper text-xs font-semibold">{initials}</span>
        </div>
        <span className="text-sm font-medium text-ink max-w-[120px] truncate">{user.name || user.email}</span>
        <svg className={`w-3.5 h-3.5 text-ink-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-paper border border-paper-border rounded-xl shadow-lg py-1.5 animate-fade-in z-50">
          <div className="px-4 py-2.5 border-b border-paper-border">
            <p className="text-xs font-semibold text-ink truncate">{user.name}</p>
            <p className="text-xs text-ink-muted truncate">{user.email}</p>
          </div>
          {/* 🔌 PLACEHOLDER: Link to /profile page */}
          <button
            className="w-full text-left px-4 py-2.5 text-sm text-ink-muted hover:text-ink hover:bg-paper-warm transition-colors flex items-center gap-2.5"
            onClick={() => { alert('🔌 Placeholder: Navigate to /profile'); setOpen(false) }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </button>
          {/* 🔌 PLACEHOLDER: Link to /settings page */}
          <button
            className="w-full text-left px-4 py-2.5 text-sm text-ink-muted hover:text-ink hover:bg-paper-warm transition-colors flex items-center gap-2.5"
            onClick={() => { alert('🔌 Placeholder: Navigate to /settings'); setOpen(false) }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
          <div className="border-t border-paper-border mt-1.5 pt-1.5">
            <button
              onClick={() => { onLogout(); setOpen(false) }}
              className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/analyze', label: 'Analyze' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-paper-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-paper text-xs font-bold font-display">M</span>
          </div>
          <span className="font-display text-lg font-semibold text-ink tracking-tight">
            MD<span className="text-accent-mid"> Expert</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active ? 'bg-accent-light text-accent' : 'text-ink-muted hover:text-ink hover:bg-paper-warm'
                }`}
              >
                {link.label}
              </Link>
            )
          })}

          <div className="ml-3 flex items-center gap-2">
            {user ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-accent text-paper rounded-lg text-sm font-medium hover:bg-accent-mid transition-all duration-200 shadow-sm"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden p-2 rounded-lg text-ink-muted hover:bg-paper-warm transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-paper-border bg-paper animate-fade-in">
          <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium ${
                  location.pathname === link.to ? 'bg-accent-light text-accent' : 'text-ink-muted hover:text-ink hover:bg-paper-warm'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-paper-border mt-2 pt-2 flex flex-col gap-1">
              {user ? (
                <>
                  <div className="px-4 py-2">
                    <p className="text-xs font-semibold text-ink">{user.name}</p>
                    <p className="text-xs text-ink-muted">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false) }}
                    className="px-4 py-3 text-sm text-red-500 text-left hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-sm text-ink-muted hover:text-ink hover:bg-paper-warm rounded-lg">Sign in</Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)} className="px-4 py-3 bg-accent text-paper rounded-lg text-sm font-medium text-center">Get started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}