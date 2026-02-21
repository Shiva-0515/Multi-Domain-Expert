import { useState } from 'react'
import QueryForm from '../components/QueryForm.jsx'
import MarkdownViewer from '../components/MarkdownViewer.jsx'
import api from '../services/api.js'

export default function AnalysisPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const hasOutput = loading || result

  const handleSubmit = async ({ expertId, query }) => {
    setLoading(true)
    setError(null)
    setResult(null)
try {
  const { data } = await api.post(
    "/research/generate",
    {
      expert_id: expertId,
      query
    }
  )
  if (data.report_markdown?.startsWith('```')) {
  data.report_markdown = data.report_markdown
    .replace(/^```[a-z]*\n?/i, '')
    .replace(/```$/, '')
}

  setResult(data)
  console.log("markdown result:", data.report_markdown)

} catch (err) {
  setError(
    err.response?.data?.detail ||
    err.message ||
    'Something went wrong. Please try again.'
  )
}
 finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">

      {/* Page header */}
      <div className="border-b border-paper-border bg-paper-warm/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-semibold text-ink">Analysis Workspace</h1>
            <p className="text-ink-muted text-xs mt-0.5">
              {hasOutput ? 'Your report is ready — scroll to explore' : 'Choose an expert and describe your situation'}
            </p>
          </div>
          {hasOutput && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink border border-paper-border hover:border-ink/20 px-3 py-2 rounded-lg transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              New analysis
            </button>
          )}
        </div>
      </div>

      {/* Main split layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* ── Left panel: Form ──
            Width transitions: full → 35% when output appears */}
        <div
          className={`
            flex flex-col border-b lg:border-b-0 lg:border-r border-paper-border
            bg-paper-warm/30 overflow-y-auto
            transition-all duration-500 ease-in-out
            ${hasOutput
              ? 'lg:w-[35%] lg:min-w-[280px]'
              : 'lg:w-full'
            }
          `}
        >
          <div className={`p-6 flex-1 ${!hasOutput ? 'max-w-2xl mx-auto w-full' : ''}`}>
            <QueryForm
              onSubmit={handleSubmit}
              loading={loading}
              compact={hasOutput}
            />

            {/* Error */}
            {error && (
              <div className="mt-4 animate-fade-in">
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                  <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-red-700">Request failed</p>
                    <p className="text-xs text-red-600 mt-0.5">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right panel: Output ──
            Hidden until output appears, then 65% */}
        {hasOutput && (
          <div className="flex-1 lg:w-[65%] overflow-y-auto animate-slide-in-right">
            <div className="p-6 h-full">
              <MarkdownViewer result={result} loading={loading} />
            </div>
          </div>
        )}

        {/* ── Empty state (no output yet, full width) ── */}
        {!hasOutput && (
          <div className="hidden lg:flex flex-col items-center justify-center flex-1 text-center px-12 opacity-70">
            <div className="w-50 h-20 rounded-full bg-paper-border flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="font-display text-2xl font-semibold text-ink-muted mb-2">Your report will appear here</p>
            <p className="text-ink-muted text-sm max-w-xs">Fill in the form on the left and click Generate to produce a structured expert report.</p>
          </div>
        )}

      </div>
    </div>
  )
}