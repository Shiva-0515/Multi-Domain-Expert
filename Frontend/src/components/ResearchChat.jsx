import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import api from '../services/api'

// ─── Message bubble ────────────────────────────────────────────────────────
function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold mt-0.5 ${
        isUser ? 'bg-accent text-paper' : 'bg-paper-warm border border-paper-border text-ink-muted'
      }`}>
        {isUser ? 'U' : 'AI'}
      </div>

      <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-6 ${
        isUser
          ? 'bg-accent text-paper rounded-tr-sm'
          : 'bg-paper-warm border border-paper-border text-ink-light rounded-tl-sm'
      }`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {message.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

// ─── Typing indicator ──────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <div className="w-7 h-7 rounded-full bg-paper-warm border border-paper-border flex items-center justify-center text-xs font-semibold text-ink-muted shrink-0">
        AI
      </div>
      <div className="bg-paper-warm border border-paper-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-pulse-soft" />
        <span className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-pulse-soft" />
        <span className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-pulse-soft" />
      </div>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────
export default function ResearchChat({ reportContext, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content:
        "I've read the report. Ask me anything — I can clarify findings, explain sections, or break things down.",
    },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)

  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // 🔥 MAIN LOGIC (AXIOS + BACKEND)
  const handleSend = async () => {
    const text = input.trim()
    if (!text || thinking) return

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: text,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setThinking(true)

    try {
  const response = await api.post('/chat', {
    report: reportContext,
    message: text,
  })

  const reply = response.data?.answer || 'No response.'

  setMessages((prev) => [
    ...prev,
    {
      id: Date.now() + 1,
      role: 'assistant',
      content: reply,
    },
  ])

} catch (err) {
  const errorMessage =
    err.response?.data?.detail ||
    'Something went wrong. Please try again.'

  setMessages((prev) => [
    ...prev,
    {
      id: Date.now() + 1,
      role: 'assistant',
      content: `⚠️ ${errorMessage}`,
      isError: true,
    },
  ])

} finally {
  setThinking(false)
   }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const suggested = [
    'Summarise the key findings',
    'What are the main risks?',
    'Explain the methodology',
    'What should I do next?',
  ]

  return (
    <div className="h-full flex flex-col bg-paper-card border border-paper-border rounded-2xl shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 border-b border-paper-border bg-paper-warm/50 flex items-center justify-between shrink-0">
        <div>
          <p className="text-sm font-semibold text-ink">Chat with Report</p>
          <p className="text-xs text-ink-muted">Ask questions about this report</p>
        </div>
        <button onClick={onClose} className="text-xs text-ink-muted hover:text-ink">
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {thinking && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && !thinking && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {suggested.map((s) => (
            <button
              key={s}
              onClick={() => setInput(s)}
              className="px-3 py-1.5 bg-paper-warm border border-paper-border text-xs rounded-full"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-paper-border">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about this report…"
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || thinking}
            className="px-3 py-2 bg-accent text-white rounded-lg disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}