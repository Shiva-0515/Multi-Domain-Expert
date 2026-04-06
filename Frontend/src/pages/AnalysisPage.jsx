import { useState } from 'react'
import QueryForm from '../components/QueryForm.jsx'
import MarkdownViewer from '../components/MarkdownViewer.jsx'
import ResearchChat from '../components/ResearchChat.jsx'
import api from '../services/api.js'
import toast from "react-hot-toast"


export default function AnalysisPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [chatOpen, setChatOpen] = useState(false)

  const hasOutput = loading || result
  const mode = !hasOutput ? 'form-only' : chatOpen ? 'chat' : 'form-report'

  const handleSubmit = async ({ expertId, query }) => {
    setLoading(true)
    setError(null)
    setResult(null)
    setChatOpen(false)

    try {
  const promise = api.post("/research/generate", {
    expert_id: expertId,
    query
  })

  toast.promise(promise, {
    loading: "Generating report...",
    success: "Report generated successfully 🎉",
    error: (err) =>
      err.response?.data?.detail ||
      "Failed to generate report",
  })

  const { data } = await promise

  if (data.report_markdown?.startsWith('```')) {
    data.report_markdown = data.report_markdown
      .replace(/^```[a-z]*\n?/i, '')
      .replace(/```$/, '')
  }

  setResult(data)

} catch (err) {
  const errorMessage =
    err.response?.data?.detail ||
    err.message ||
    "Something went wrong. Please try again."

  setError(errorMessage)

} finally {
  setLoading(false)
}
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    setChatOpen(false)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">

      {/* Header */}
      <div className="border-b border-paper-border bg-paper-warm/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-semibold text-ink">
              Analysis Workspace
            </h1>
            <p className="text-ink-muted text-xs mt-0.5">
              {mode === 'chat'
                ? 'Chatting with your report'
                : hasOutput
                ? 'Your report is ready — scroll to explore'
                : 'Choose an expert and describe your situation'}
            </p>
          </div>

          {hasOutput && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink border border-paper-border hover:border-ink/20 px-3 py-2 rounded-lg transition-all"
            >
              New analysis
            </button>
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* LEFT: FORM */}
        <div
          className={`
            flex flex-col border-b lg:border-b-0 lg:border-r border-paper-border
            bg-paper-warm/30 overflow-y-auto
            transition-all duration-500 ease-in-out
            ${mode === 'form-only' ? 'lg:w-full' : ''}
            ${mode === 'form-report' ? 'lg:w-[35%]' : ''}
            ${mode === 'chat' ? 'lg:w-0 opacity-0 pointer-events-none overflow-hidden' : ''}
          `}
        >
          <div className={`p-6 flex-1 ${!hasOutput ? 'max-w-2xl mx-auto w-full' : ''}`}>
            <QueryForm
              onSubmit={handleSubmit}
              loading={loading}
              compact={hasOutput}
            />

            {error && (
              <div className="mt-4">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-600">
                  {error}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CENTER: REPORT */}
        {hasOutput && (
          <div
            className={`
              flex flex-col overflow-hidden transition-all duration-500
              ${mode === 'form-report' ? 'flex-1' : ''}
              ${mode === 'chat' ? 'lg:w-[45%]' : ''}
            `}
          >
            {/* Back bar in chat mode */}
            {mode === 'chat' && (
              <div className="px-4 py-2 bg-paper-warm border-b border-paper-border">
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-xs text-ink-muted hover:text-ink"
                >
                  ← Back to report
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6">
              <MarkdownViewer
                result={result}
                loading={loading}
                onOpenChat={() => setChatOpen(true)}
                chatOpen={chatOpen}
              />
            </div>
          </div>
        )}

        {/* RIGHT: CHAT PANEL */}
        {mode === 'chat' && (
          <div className="lg:w-[55%] border-l border-paper-border flex flex-col animate-slide-in-right h-full">
  
            <div className="flex-1 overflow-hidden flex">
              <ResearchChat
                reportContext={result?.report_markdown || ''}
                onClose={() => setChatOpen(false)}
                className="flex-1"
              />
            </div>

          </div>
        )}

        {/* EMPTY STATE */}
        {!hasOutput && (
          <div className="hidden lg:flex flex-col items-center justify-center flex-1 text-center px-12 opacity-70">
            <p className="text-xl text-ink-muted">
              Your report will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}