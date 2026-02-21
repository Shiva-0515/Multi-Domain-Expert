export default function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper-warm via-paper to-paper pointer-events-none" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 py-28 sm:py-36 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-accent-light border border-accent/20 text-accent text-xs font-medium px-3 py-1.5 rounded-full mb-8 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft inline-block" />
          Research-grade AI analysis
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-tight mb-6 animate-fade-up animation-delay-100">
          Multi-Domain
          <br />
          <span className="italic font-normal text-accent">AI Expert</span>
        </h1>

        {/* Subheading */}
        <p className="text-ink-muted text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-10 animate-fade-up animation-delay-200">
          Research-backed structured insights across finance, healthcare, and more — powered by specialized AI models.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up animation-delay-300">
          <button
            onClick={onStart}
            className="px-8 py-3.5 bg-ink text-paper rounded-xl font-medium text-sm hover:bg-ink-light transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            Start Analysis
          </button>
          <span className="text-ink-muted text-sm">No login required</span>
        </div>

        {/* Domain pills */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 animate-fade-up animation-delay-300">
          {['Finance & Investment', 'Medical & Health', 'Structured Reports', 'Evidence-Based'].map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 bg-paper border border-paper-border text-ink-muted text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-paper-border to-transparent" />
    </section>
  )
}