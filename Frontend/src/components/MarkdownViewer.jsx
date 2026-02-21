// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'

// function SkeletonLoader() {
//   return (
//     <div className="space-y-3 p-1">
//       <div className="shimmer-bg h-6 rounded-lg w-3/5" />
//       <div className="shimmer-bg h-4 rounded-lg w-full" />
//       <div className="shimmer-bg h-4 rounded-lg w-5/6" />
//       <div className="shimmer-bg h-4 rounded-lg w-full" />
//       <div className="shimmer-bg h-4 rounded-lg w-4/5" />
//       <div className="mt-6 shimmer-bg h-5 rounded-lg w-2/5" />
//       <div className="shimmer-bg h-4 rounded-lg w-full" />
//       <div className="shimmer-bg h-4 rounded-lg w-11/12" />
//       <div className="shimmer-bg h-4 rounded-lg w-full" />
//       <div className="mt-6 shimmer-bg h-5 rounded-lg w-1/3" />
//       <div className="shimmer-bg h-4 rounded-lg w-full" />
//       <div className="shimmer-bg h-4 rounded-lg w-3/4" />
//       <div className="shimmer-bg h-4 rounded-lg w-5/6" />
//       <div className="mt-6 shimmer-bg h-5 rounded-lg w-2/5" />
//       <div className="shimmer-bg h-4 rounded-lg w-full" />
//       <div className="shimmer-bg h-4 rounded-lg w-4/6" />
//     </div>
//   )
// }

// const mdComponents = {
//   h1: ({ children }) => (
//     <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-0 mb-5 leading-tight border-b border-paper-border pb-3">
//       {children}
//     </h1>
//   ),
//   h2: ({ children }) => (
//     <h2 className="font-display text-xl sm:text-2xl font-semibold text-ink mt-8 mb-4 leading-snug">
//       {children}
//     </h2>
//   ),
//   h3: ({ children }) => (
//     <h3 className="font-body text-base font-semibold text-ink mt-6 mb-2.5">{children}</h3>
//   ),
//   h4: ({ children }) => (
//     <h4 className="font-body text-xs font-semibold text-ink-muted uppercase tracking-widest mt-5 mb-2">{children}</h4>
//   ),
//   p: ({ children }) => (
//     <p className="text-ink-light text-sm leading-7 mb-4">{children}</p>
//   ),
//   ul: ({ children }) => (
//     <ul className="mb-4 space-y-2 ml-1">{children}</ul>
//   ),
//   ol: ({ children }) => (
//     <ol className="mb-4 space-y-2 ml-1 list-decimal list-inside">{children}</ol>
//   ),
//   li: ({ children }) => (
//     <li className="flex items-start gap-2.5 text-sm text-ink-light leading-6">
//       <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
//       <span className="flex-1">{children}</span>
//     </li>
//   ),
//   blockquote: ({ children }) => (
//     <blockquote className="border-l-4 border-accent bg-accent-light rounded-r-xl px-4 py-3 my-5 text-sm text-ink-light italic">
//       {children}
//     </blockquote>
//   ),
//   code: ({ inline, children }) =>
//     inline ? (
//       <code className="font-mono text-xs bg-paper-warm border border-paper-border text-accent-mid px-1.5 py-0.5 rounded">
//         {children}
//       </code>
//     ) : (
//       <pre className="font-mono text-xs bg-ink text-green-400 p-4 rounded-xl overflow-x-auto my-4 leading-6">
//         <code>{children}</code>
//       </pre>
//     ),
//   pre: ({ children }) => <>{children}</>,
//   table: ({ children }) => (
//     <div className="overflow-x-auto my-5 rounded-xl border border-paper-border">
//       <table className="w-full text-sm">{children}</table>
//     </div>
//   ),
//   thead: ({ children }) => (
//     <thead className="bg-paper-warm border-b border-paper-border">{children}</thead>
//   ),
//   tbody: ({ children }) => (
//     <tbody className="divide-y divide-paper-border">{children}</tbody>
//   ),
//   tr: ({ children }) => (
//     <tr className="hover:bg-paper-warm/60 transition-colors">{children}</tr>
//   ),
//   th: ({ children }) => (
//     <th className="px-4 py-3 text-left text-xs font-semibold text-ink-muted uppercase tracking-wider">{children}</th>
//   ),
//   td: ({ children }) => (
//     <td className="px-4 py-3 text-ink-light text-sm">{children}</td>
//   ),
//   strong: ({ children }) => (
//     <strong className="font-semibold text-ink">{children}</strong>
//   ),
//   em: ({ children }) => (
//     <em className="italic text-ink-light">{children}</em>
//   ),
//   hr: () => <hr className="my-6 border-paper-border" />,
//   a: ({ href, children }) => (
//     <a href={href} target="_blank" rel="noopener noreferrer"
//       className="text-accent underline underline-offset-2 hover:text-accent-mid transition-colors">
//       {children}
//     </a>
//   ),
// }

// const EXPERT_META = {
//   finance_v1: { label: 'Finance Expert', icon: '📈' },
//   medical_v1: { label: 'Medical Expert', icon: '🩺' },
//   career_v1: { label: 'Career Coach', icon: '💼' },
//   education_v1: { label: 'Learning Consultant', icon: '📚' },
//   travel_v1: { label: 'Trip Planner', icon: '✈️' },
//   software_v1: { label: 'Software Architect', icon: '💻' },
// }

// export default function MarkdownViewer({ result, loading }) {
//   const meta = result ? EXPERT_META[result.expert_id] : null

//   return (
//     <div className="h-full flex flex-col bg-paper-card border border-paper-border rounded-2xl shadow-sm overflow-hidden">

//       {/* Header */}
//       <div className="px-6 py-4 border-b border-paper-border bg-paper-warm/50 flex items-center justify-between gap-4 shrink-0">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-lg bg-accent-light border border-accent/20 flex items-center justify-center text-base shrink-0">
//             {loading
//               ? <svg className="w-4 h-4 text-accent animate-spin" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//               : meta?.icon || '📄'
//             }
//           </div>
//           <div>
//             <p className="text-sm font-semibold text-ink">
//               {loading ? 'Generating report…' : 'Expert Report'}
//             </p>
//             {meta && !loading && (
//               <p className="text-xs text-ink-muted">{meta.label}</p>
//             )}
//           </div>
//         </div>
//         {result?.execution_time && (
//           <span className="text-xs text-ink-muted font-mono bg-paper border border-paper-border px-2.5 py-1 rounded-full shrink-0">
//             ⏱ {result.execution_time}
//           </span>
//         )}
//       </div>

//       {/* Query echo */}
//       {result?.query && (
//         <div className="px-6 py-3 bg-paper-warm/40 border-b border-paper-border shrink-0">
//           <p className="text-xs text-ink-muted line-clamp-2">
//             <span className="font-semibold text-ink-light">Query: </span>
//             {result.query}
//           </p>
//         </div>
//       )}

//       {/* Content — scrollable */}
//       <div className="flex-1 overflow-y-auto px-6 py-6">
//         {loading ? (
//           <SkeletonLoader />
//         ) : result?.report_markdown ? (
//           <article>
//             <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
//               {result.report_markdown}
//             </ReactMarkdown>
//           </article>
//         ) : null}
//       </div>
//     </div>
//   )
// }
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const LOADING_QUOTES = [
  "Analyzing your situation…",
  "Consulting expert models…",
  "Structuring your personalized report…",
  "Validating recommendations…",
  "Almost there — assembling insights…",
  "Turning your query into actionable guidance…",
]

function SkeletonLoader() {
  return (
    <div className="space-y-3 p-1">
      {[...Array(16)].map((_, i) => (
        <div key={i} className="shimmer-bg h-4 rounded-lg w-full" />
      ))}
    </div>
  )
}

// const mdComponents = {
//   h1: ({ children }) => (
//     <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-0 mb-5 leading-tight border-b border-paper-border pb-3">
//       {children}
//     </h1>
//   ),
//   h2: ({ children }) => (
//     <h2 className="font-display text-xl sm:text-2xl font-semibold text-ink mt-8 mb-4 leading-snug">
//       {children}
//     </h2>
//   ),
//   p: ({ children }) => (
//     <p className="text-ink-light text-sm leading-7 mb-4">{children}</p>
//   ),
//   li: ({ children }) => (
//     <li className="flex items-start gap-2.5 text-sm text-ink-light leading-6">
//       <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
//       <span className="flex-1">{children}</span>
//     </li>
//   ),

//   /* LIGHT CODE BLOCKS */
//   code: ({ inline, children }) =>
//     inline ? (
//       <code className="font-mono text-xs bg-paper-warm border border-paper-border text-accent-mid px-1.5 py-0.5 rounded">
//         {children}
//       </code>
//     ) : (
//       <pre className="font-mono text-xs bg-paper-warm border border-paper-border text-ink p-4 rounded-xl overflow-x-auto my-4 leading-6">
//         <code>{children}</code>
//       </pre>
//     ),

//   pre: ({ children }) => children,
// }

const mdComponents = {
  h1: ({ children }) => (
    <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-0 mb-5 leading-tight border-b border-paper-border pb-3">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-display text-xl sm:text-2xl font-semibold text-ink mt-8 mb-4 leading-snug">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-body text-base font-semibold text-ink mt-6 mb-2.5">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-body text-xs font-semibold text-ink-muted uppercase tracking-widest mt-5 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-ink-light text-sm leading-7 mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 space-y-2 ml-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 space-y-2 ml-1 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-2.5 text-sm text-ink-light leading-6">
      <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
      <span className="flex-1">{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent bg-accent-light rounded-r-xl px-4 py-3 my-5 text-sm text-ink-light italic">
      {children}
    </blockquote>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code className="font-mono text-xs bg-paper-warm border border-paper-border text-accent-mid px-1.5 py-0.5 rounded">
        {children}
      </code>
    ) : (
      <pre className="font-mono text-xs bg-ink text-green-400 p-4 rounded-xl overflow-x-auto my-4 leading-6">
        <code>{children}</code>
      </pre>
    ),
  pre: ({ children }) => <>{children}</>,
  table: ({ children }) => (
    <div className="overflow-x-auto my-5 rounded-xl border border-paper-border">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-paper-warm border-b border-paper-border">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-paper-border">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-paper-warm/60 transition-colors">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-xs font-semibold text-ink-muted uppercase tracking-wider">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-ink-light text-sm">{children}</td>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-ink-light">{children}</em>
  ),
  hr: () => <hr className="my-6 border-paper-border" />,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-accent underline underline-offset-2 hover:text-accent-mid transition-colors">
      {children}
    </a>
  ),
}


const EXPERT_META = {
  finance_v1: { label: 'Finance Expert', icon: '📈' },
  medical_v1: { label: 'Medical Expert', icon: '🩺' },
  career_v1: { label: 'Career Coach', icon: '💼' },
  education_v1: { label: 'Learning Consultant', icon: '📚' },
  travel_v1: { label: 'Trip Planner', icon: '✈️' },
  software_v1: { label: 'Software Architect', icon: '💻' },
}

export default function MarkdownViewer({ result, loading }) {
  const meta = result ? EXPERT_META[result.expert_id] : null
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    if (!loading) return
    const timer = setInterval(
      () => setQuoteIndex(i => (i + 1) % LOADING_QUOTES.length),
      2000
    )
    return () => clearInterval(timer)
  }, [loading])

  const cleanedMarkdown = result?.report_markdown
    ?.replace(/^```[a-z]*\n?/i, '')
    ?.replace(/```$/, '')

  return (
    <div className="h-full flex flex-col bg-paper-card border border-paper-border rounded-2xl shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-paper-border bg-paper-warm/50 flex items-center justify-between gap-4">

  {/* Left */}
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg bg-accent-light border border-accent/20 flex items-center justify-center text-base shrink-0">
      {loading ? '⏳' : meta?.icon || '📄'}
    </div>

    <div>
      <p className="text-sm font-semibold text-ink leading-none">
        {loading ? 'Generating report…' : 'Expert Report'}
      </p>

      {meta && !loading && (
        <p className="text-xs text-ink-muted mt-0.5">{meta.label}</p>
      )}
    </div>
  </div>

  {/* Right */}
  {result?.execution_time && (
    <span className="text-xs text-ink-muted font-mono bg-paper border border-paper-border px-2.5 py-1 rounded-full shrink-0">
      ⏱ {result.execution_time}
    </span>
  )}

</div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">

        {loading ? (
          <div className="space-y-6">
            <p className="text-center text-sm text-ink-muted italic">
              {LOADING_QUOTES[quoteIndex]}
            </p>
            <SkeletonLoader />
          </div>
        ) : cleanedMarkdown ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {cleanedMarkdown}
          </ReactMarkdown>
        ) : null}

      </div>
    </div>
  )
}