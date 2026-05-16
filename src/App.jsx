import { useCallback, useEffect, useState } from 'react'
import './App.css'

const slides = [
  {
    title: 'Fresh context, better results',
    subtitle:
      'A 10–15 minute guide to better GHCP Chat and GHCP CLI habits for engineers, PMs, and designers.',
    points: [
      'Positive framing: there is a better way to run sessions.',
      'Core idea: One session = one task.',
      'Goal: faster, clearer, more reliable outcomes with less friction.',
    ],
  },
  {
    title: 'Why this matters',
    subtitle: 'Session quality directly affects answer quality and speed.',
    points: [
      'Mixed topics in one session create noise and confusion.',
      'Focused sessions reduce back-and-forth and rework.',
      'This is true across product, design, and engineering workflows.',
    ],
  },
  {
    title: 'Memory vs context window',
    subtitle:
      'Think of AI sessions as a workspace with limited active room, not perfect long-term memory.',
    points: [
      'Memory can help with recurring preferences, but it is not a full transcript recall engine.',
      'The context window is what the model can actively reason over right now.',
      'If a thread has been open for days, do not assume details from 2–3 days ago are still reliable in active context.',
      'High-level note: token-related changes are coming next month, which reinforces good context hygiene habits.',
    ],
  },
  {
    title: 'When to continue vs start new',
    subtitle: 'If the task changes, start a new session.',
    points: [
      'Continue the same session when the task is the same deliverable.',
      'Start a new session for a new issue, audience, or objective.',
      'Avoid using one long session for unrelated conversations.',
      'Use the AI like a focused workspace, not a long-lived memory dump.',
    ],
    examples: [
      {
        label: 'Continue same session',
        code: `Task: finalize release notes draft\nFollow-up: tighten wording for PM audience\nFollow-up: add one design example`,
      },
      {
        label: 'Start new session',
        code: `Old task done: release notes\nNew task: security questionnaire response\nAction: open fresh session with only relevant context`,
      },
    ],
  },
  {
    title: 'GHCP Chat example',
    subtitle: 'Bad pattern vs better pattern for chat threads.',
    points: [
      'Bad: one thread used for roadmap planning, bug triage, copy edits, and hiring notes.',
      'Better: one chat per deliverable; start a new chat as soon as topic shifts.',
      'Result: cleaner prompts, stronger outputs, easier review.',
    ],
    examples: [
      {
        label: 'Less effective (single mixed thread)',
        code: `# Chat Thread A\n1) Plan Q3 roadmap\n2) Debug CLI auth error\n3) Write onboarding copy\n4) Summarize design critique`,
      },
      {
        label: 'Better (focused chats)',
        code: `# Chat Thread A\nTask: Plan Q3 roadmap\n\n# Chat Thread B\nTask: Debug CLI auth error\n\n# Chat Thread C\nTask: Write onboarding copy`,
      },
    ],
  },
  {
    title: 'GHCP CLI example',
    subtitle: 'Use fresh terminal sessions for fresh issues.',
    points: [
      'Bad: one long-lived CLI session reused for unrelated tasks over days.',
      'Better: new CLI session per issue or deliverable.',
      'Result: less accidental context bleed and clearer intent.',
    ],
    examples: [
      {
        label: 'Less effective (long-lived mixed session)',
        code: `$ ghcp chat\n> fix dashboard bug\n...later...\n> draft design rationale\n...later...\n> review PM kickoff notes`,
      },
      {
        label: 'Better (fresh session per issue)',
        code: `$ ghcp chat --new\n> issue #412: fix dashboard bug\n\n$ ghcp chat --new\n> prepare design rationale for nav update\n\n$ ghcp chat --new\n> summarize PM kickoff decisions`,
      },
    ],
  },
  {
    title: 'Why smaller context windows are good practice',
    subtitle: 'Smaller, relevant context improves signal-to-noise.',
    points: [
      'Higher relevance: less unrelated information competing for attention.',
      'More predictable outputs: easier to review and trust.',
      'Faster collaboration: teammates can jump into focused threads quickly.',
      'Fresh context, better results.',
    ],
  },
  {
    title: 'Closing takeaways',
    subtitle: 'Simple rules for better outcomes every day.',
    points: [
      'One session = one task.',
      'If the task changes, start a new session.',
      'Keep prompts and context windows small and relevant.',
      'Use the AI like a focused workspace, not a long-lived memory dump.',
    ],
  },
]

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const totalSlides = slides.length
  const slide = slides[currentSlide]

  const goPrevious = useCallback(
    () => setCurrentSlide((value) => Math.max(0, value - 1)),
    [],
  )
  const goNext = useCallback(
    () => setCurrentSlide((value) => Math.min(totalSlides - 1, value + 1)),
    [totalSlides],
  )

  useEffect(() => {
    const onKeyDown = (event) => {
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault()
        goNext()
      }

      if (['ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault()
        goPrevious()
      }

      if (event.key === 'Home') {
        event.preventDefault()
        setCurrentSlide(0)
      }

      if (event.key === 'End') {
        event.preventDefault()
        setCurrentSlide(totalSlides - 1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrevious, totalSlides])

  return (
    <main className="deck">
      <header className="deck-header">
        <p className="eyebrow">GHCP Session Best Practices</p>
        <h1>{slide.title}</h1>
        <p className="subtitle">{slide.subtitle}</p>
      </header>

      <section className="deck-content" aria-live="polite">
        <ul>
          {slide.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        {slide.examples && (
          <div className="example-grid">
            {slide.examples.map((example) => (
              <article key={example.label} className="example-card">
                <h2>{example.label}</h2>
                <pre>
                  <code>{example.code}</code>
                </pre>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="deck-footer">
        <div className="nav-row">
          <button type="button" onClick={goPrevious} disabled={currentSlide === 0}>
            Previous
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={currentSlide === totalSlides - 1}
          >
            Next
          </button>
        </div>
      </footer>
    </main>
  )
}

export default App
