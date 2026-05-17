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
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  pattern: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  beaker: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3h6v11l3.5 6H5.5L9 14V3z" />
      <line x1="6" y1="3" x2="18" y2="3" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  terminal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  swap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  imagePlaceholder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
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
      ) : slide.layout === 'image-list' ? (
        <div className="image-list-wrapper" aria-live="polite">
          <h1 className="image-list-title">{slide.title}</h1>
          <div className="image-list-columns">
            <div className="image-list-placeholder">
              {ICONS.imagePlaceholder}
              <span>Image placeholder</span>
            </div>
            <ul className="image-list-items">
              {slide.items.map((item) => (
                <li key={item.text}>
                  <div className="image-list-item-icon">{ICONS[item.icon]}</div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : slide.layout === 'comparison-cards' ? (
        <div className="comparison-wrapper" aria-live="polite">
          <h1 className="comparison-title">{slide.title}</h1>
          <div className="comparison-grid">
            {slide.cards.map((card) => (
              <div key={card.heading} className="comparison-card">
                <div className="comparison-card-header">
                  <div className="comparison-card-icon">{ICONS[card.icon]}</div>
                  <h2 className="comparison-card-heading">{card.heading}</h2>
                </div>
                <ul className="comparison-points">
                  {card.points.map((point) => (
                    <li key={point.label}>
                      <span><span className="comparison-point-label">{point.label}:</span> {point.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : slide.layout === 'content-card' ? (
        <div className="content-card-wrapper" aria-live="polite">
          <h1 className="content-card-title">{slide.title}</h1>
          {slide.subtitle && <p className="content-card-subtitle">{slide.subtitle}</p>}
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
            <div className="slide-right-panel">
              {ICONS.imagePlaceholder}
              <span>Image placeholder</span>
            </div>
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
