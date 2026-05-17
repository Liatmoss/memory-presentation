import { useCallback, useEffect, useState } from 'react'
import './App.css'
import slides from './docs/index.js'

const ICONS = {
  lightning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  summarise: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
}

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
      {slide.heading && slide.image ? (
        <div className="slide-heading-image-wrapper" aria-live="polite">
          <h1 className="slide-heading-text">{slide.heading}</h1>
          <img src={slide.image} alt="" />
        </div>
      ) : slide.image ? (
        <div className="slide-image-wrapper" aria-live="polite">
          <img src={slide.image} alt="" />
        </div>
      ) : slide.question ? (
        <div className="slide-question-wrapper" aria-live="polite">
          <p className="question-text">{slide.question}</p>
        </div>
      ) : slide.layout === 'rule-zero' ? (
        <div className="rule-zero-wrapper" aria-live="polite">
          <div className="rule-zero-content">
            <p className="rule-zero-title">{slide.title}</p>
            <h1 className="rule-zero-headline">{slide.headline}</h1>
            <p className="rule-zero-subtitle">{slide.subtitle}</p>
            <div className="rule-zero-cards">
              {slide.cards.map((card) => (
                <div key={card.label} className="rule-zero-card">
                  <div className="rule-zero-card-icon">{ICONS[card.icon]}</div>
                  <span>{card.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : slide.layout === 'content-card' ? (
        <div className="content-card-wrapper" aria-live="polite">
          <h1 className="content-card-title">{slide.title}</h1>
          <p className="content-card-subtitle">{slide.subtitle}</p>
          <div className="content-card">
            <div className="content-card-header">
              <div className="content-card-icon">{ICONS[slide.card.icon]}</div>
              <h2 className="content-card-heading">{slide.card.heading}</h2>
            </div>
            <ul className="content-card-points">
              {slide.card.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="content-card-secondary-heading">{slide.card.secondaryHeading}</p>
            <ul className="content-card-points">
              {slide.card.secondaryPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : slide.layout === 'dark-list' ? (
        <div className="dark-list-wrapper" aria-live="polite">
          <h1 className="dark-list-title">{slide.title}</h1>
          <div className="dark-list-columns">
            <ol className="numbered-list" start="0">
              {slide.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ol>
            <div className="slide-right-panel" />
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}

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
