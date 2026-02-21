
import { useState } from 'react'

const EXPERTS = [
  {
    id: 'finance_v1',
    label: 'Finance Expert',
    icon: '📈',
    shortDesc: 'Investment, markets, planning',
    placeholder: 'E.g. I have $50,000 to invest over 10 years with moderate risk tolerance. I\'m interested in a diversified portfolio...',
  },
  {
    id: 'medical_v1',
    label: 'Medical Expert',
    icon: '🩺',
    shortDesc: 'Health, symptoms, clinical',
    placeholder: 'E.g. I\'ve been experiencing persistent fatigue and mild chest discomfort for the past two weeks...',
  },
  {
    id: 'career_v1',
    label: 'Career Coach',
    icon: '💼',
    shortDesc: 'Jobs, skills, career growth',
    placeholder: 'E.g. I\'m a final-year CS student and want to become a backend developer. What skills and roadmap should I follow?',
  },
  {
    id: 'education_v1',
    label: 'Learning Consultant',
    icon: '📚',
    shortDesc: 'Study plans, learning paths',
    placeholder: 'E.g. I want to learn Data Structures from scratch in 3 months. I can study 2 hours per day...',
  },
  {
    id: 'travel_v1',
    label: 'Trip Planner',
    icon: '✈️',
    shortDesc: 'Travel itineraries, budgeting',
    placeholder: 'E.g. Plan a 5-day budget trip to Goa for 2 people including beaches, sightseeing, and local food...',
  },
  {
    id: 'software_v1',
    label: 'Software Architect',
    icon: '💻',
    shortDesc: 'System design, development',
    placeholder: 'E.g. I want to build a MERN stack app for online learning. Help me design the architecture...',
  },
];

export default function QueryForm({ onSubmit, loading, compact }) {
  const [expertId, setExpertId] = useState('finance_v1')
  const [query, setQuery] = useState('')
  const [validationError, setValidationError] = useState('')

  const selectedExpert = EXPERTS.find((e) => e.id === expertId)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) {
      setValidationError('Please describe your situation.')
      return
    }
    if (query.trim().length < 10) {
      setValidationError('Please provide a bit more detail.')
      return
    }
    setValidationError('')
    onSubmit({ expertId, query: query.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Header — hidden in compact mode */}
      {!compact && (
        <div className="mb-2">
          <h2 className="font-display text-2xl font-semibold text-ink">Generate a Report</h2>
          <p className="text-ink-muted text-sm mt-1">Select your domain and describe your situation in detail.</p>
        </div>
      )}

      {/* Expert selector */}
      <div>
        <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2.5">
          Expert Domain
        </label>
        <div className={`grid gap-2 grid-cols-2`}>
          {EXPERTS.map((expert) => {
            const active = expertId === expert.id
            return (
              <button
                key={expert.id}
                type="button"
                onClick={() => setExpertId(expert.id)}
                className={`text-left rounded-xl border-2 transition-all duration-200 ${
                  compact ? 'p-3' : 'p-4'
                } ${
                  active
                    ? 'border-accent bg-accent-light'
                    : 'border-paper-border bg-paper hover:border-ink/20 hover:bg-paper-warm'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={compact ? 'text-base' : 'text-xl'}>{expert.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium truncate ${compact ? 'text-xs' : 'text-sm'} ${active ? 'text-accent' : 'text-ink'}`}>
                      {expert.label}
                    </div>
                    {!compact && (
                      <div className="text-xs text-ink-muted mt-0.5">{expert.shortDesc}</div>
                    )}
                  </div>
                  {active && (
                    <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Textarea */}
      <div>
        <label htmlFor="query" className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2.5">
          Your Query
        </label>
        <textarea
          id="query"
          rows={compact ? 5 : 7}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (validationError) setValidationError('')
          }}
          placeholder={selectedExpert?.placeholder}
          disabled={loading}
          className={`w-full px-4 py-3 rounded-xl border text-sm font-body text-ink placeholder:text-ink-muted/50 bg-paper leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            validationError ? 'border-red-300' : 'border-paper-border'
          }`}
        />
        <div className="flex items-center justify-between mt-1.5">
          {validationError
            ? <p className="text-red-500 text-xs">{validationError}</p>
            : <p className="text-ink-muted text-xs">More detail = more precise report</p>
          }
          <span className="text-ink-muted text-xs tabular-nums">{query.length}</span>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 bg-accent text-paper rounded-xl font-medium text-sm transition-all duration-200 hover:bg-accent-mid disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating…
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generate Report
          </>
        )}
      </button>

      {/* Disclaimer */}
      <p className="text-center text-xs text-ink-muted/60 leading-relaxed">
        For informational purposes only. Not professional advice.
      </p>
    </form>
  )
}