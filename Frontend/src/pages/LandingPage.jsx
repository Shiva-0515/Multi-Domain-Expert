import { useNavigate } from 'react-router-dom'

const features = [
  {
    icon: '📈',
    title: 'Finance Expert',
    tag: 'finance_v1',
    desc: 'Portfolio analysis, investment strategy, risk assessment, market trends, and financial planning — structured into a clear, actionable report.',
    points: ['Investment & portfolio strategy', 'Risk profiling & asset allocation', 'Market trend analysis'],
    color: 'accent',
  },
  {
    icon: '🩺',
    title: 'Medical Expert',
    tag: 'medical_v1',
    desc: 'Evidence-based health insights, symptom analysis, treatment overviews, and clinical guidance drawn from structured medical knowledge.',
    points: ['Symptom analysis & differentials', 'Treatment pathway overviews', 'Evidence-based recommendations'],
    color: 'gold',
  },
]

const steps = [
  { num: '01', title: 'Choose your domain', desc: 'Select Finance or Medical — each backed by a specialized AI model tuned for that domain.' },
  { num: '02', title: 'Describe your situation', desc: 'Provide context in plain language. The more detail, the more precise the structured report.' },
  { num: '03', title: 'Receive a structured report', desc: 'Get a research-backed markdown report with headings, analysis, and actionable insights.' },
]

const stats = [
  { value: '2', label: 'Expert Domains' },
  { value: '< 30s', label: 'Report Generation' },
  { value: '100%', label: 'Structured Output' },
  { value: 'Free', label: 'No Login Required' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-24">

        {/* Background texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-paper via-paper-warm to-paper pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #1a4731 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Accent orb */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-glow rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent-light text-accent text-xs font-medium px-4 py-2 rounded-full mb-10 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft inline-block" />
            Powered by specialized AI models
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-ink leading-[1.05] mb-6 animate-fade-up animation-delay-100">
            Expert AI Analysis
            <br />
            <em className="font-normal text-accent-mid not-italic">On Demand</em>
          </h1>

          {/* Sub */}
          <p className="text-ink-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-up animation-delay-200">
            Research-backed, structured reports across finance and healthcare.
            Describe your situation — get a thorough expert-level analysis in seconds.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
            <button
              onClick={() => navigate('/analyze')}
              className="px-8 py-4 bg-accent text-paper rounded-xl font-medium text-sm hover:bg-accent-mid transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Start Your Analysis →
            </button>
            <a
              href="#how-it-works"
              className="px-8 py-4 border border-paper-border text-ink-muted rounded-xl font-medium text-sm hover:border-ink/30 hover:text-ink transition-all duration-200"
            >
              See how it works
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-up animation-delay-400">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-bold text-ink">{s.value}</div>
                <div className="text-xs text-ink-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expert Domains ── */}
      <section className="px-6 py-24 bg-paper-warm border-y border-paper-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-accent uppercase tracking-widest mb-3">Expert Domains</p>
            <h2 className="font-display text-4xl font-bold text-ink">Two Specialized Experts</h2>
            <p className="text-ink-muted mt-4 max-w-xl mx-auto">
              Each expert is purpose-built for its domain — not a generic assistant, but a structured analytical engine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-paper-card border border-paper-border rounded-2xl p-8 hover:shadow-md transition-all duration-300 group cursor-pointer"
                onClick={() => navigate('/analyze')}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{f.icon}</div>
                  <span className="text-xs font-mono text-ink-muted border border-paper-border px-2.5 py-1 rounded-full bg-paper-warm">
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink mb-3">{f.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed mb-6">{f.desc}</p>
                <ul className="space-y-2">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-ink-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center text-accent text-sm font-medium gap-1 group-hover:gap-2 transition-all">
                  Analyze with this expert
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-accent uppercase tracking-widest mb-3">Process</p>
            <h2 className="font-display text-4xl font-bold text-ink">How It Works</h2>
            <p className="text-ink-muted mt-4 max-w-xl mx-auto">
              Three steps from question to structured expert report.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-paper-border to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent-light border border-accent/20 flex items-center justify-center mb-5">
                    <span className="font-display text-lg font-bold text-accent">{step.num}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink mb-2">{step.title}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-6 py-20 bg-accent">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-paper mb-6 leading-tight">
            Ready to get your expert report?
          </h2>
          <p className="text-accent-glow text-lg mb-10 max-w-xl mx-auto">
            No login, no setup. Pick a domain, describe your situation, and receive a structured analysis instantly.
          </p>
          <button
            onClick={() => navigate('/analyze')}
            className="px-10 py-4 bg-paper text-accent rounded-xl font-semibold text-sm hover:bg-paper-warm transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            Start Analysis Now →
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-paper-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-display text-ink-muted italic">MD Expert</span>
          <span className="text-ink-muted text-xs text-center">
            AI-generated insights are for informational purposes only and do not constitute professional advice.
          </span>
        </div>
      </footer>

    </div>
  )
}