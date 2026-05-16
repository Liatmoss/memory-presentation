import { useCallback, useEffect, useState } from 'react'
import './App.css'
import slides from './docs/index.js'

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
      ) : slide.layout === 'two-column' ? (
        <>
          <header className="deck-header">
            <p className="eyebrow">GHCP Session Best Practices</p>
            <h1>{slide.title}</h1>
          </header>

          <section className="deck-content deck-content--two-column" aria-live="polite">
            <ol className="numbered-list" start="0">
              {slide.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ol>
            <div className="slide-right-panel" />
          </section>
        </>
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
