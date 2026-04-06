import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ReportContent({ markdown, chatOpen, mdComponents }) {
  const [expanded, setExpanded] = useState(false)

  if (!markdown) return null

  return (
    <>
      {chatOpen && !expanded ? (
        <div className="space-y-4">

          {/* Preview */}
          <p className="text-sm text-ink-light leading-6">
            {markdown.slice(0, 300)}...
          </p>

          {/* Fade */}
          <div className="h-16 bg-gradient-to-b from-transparent to-paper-card -mt-10" />

          <button
            onClick={() => setExpanded(true)}
            className="text-xs font-medium text-accent hover:text-accent-mid"
          >
            View full report →
          </button>

        </div>
      ) : (
        <>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {markdown}
          </ReactMarkdown>

          {chatOpen && (
            <button
              onClick={() => setExpanded(false)}
              className="mt-4 text-xs text-ink-muted hover:text-ink"
            >
              ↑ Collapse report
            </button>
          )}
        </>
      )}
    </>
  )
}