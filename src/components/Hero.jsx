import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, MailIcon, PhoneIcon } from '../icons'
import { CONTACT_INFO } from '../data/content'

const WorldMapCanvas = lazy(() => import('./WorldMapCanvas'))

const heroSlides = [
  {
    h1Line1: 'Ideal Security Solutions',
    h1Line2: 'for Your Business',
    subtitle: 'InfoSecure Solutions delivers enterprise-grade security, observability, and IT infrastructure management — trusted by leading organizations across industries.'
  },
  {
    h1Line1: 'Complete Control Over',
    h1Line2: 'Your Digital Ecosystem.',
    subtitle: 'InfoSecure Solutions unifies enterprise security, deep observability, and IT management into one seamless defense system.'
  }
]

function HeroSlide({ slide, state }) {
  return (
    <div className={`hero-slide hero-slide--${state}`} aria-hidden={state !== 'active'}>
      <h1 className="hero-title">
        <span className="line-1 gradient-text">{slide.h1Line1}</span>
        <span className="line-2">{slide.h1Line2}</span>
      </h1>
      <p className="hero-carousel-text">{slide.subtitle}</p>
    </div>
  )
}

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState(null)
  const currentIndexRef = useRef(0)
  const exitTimerRef = useRef(null)

  const goToSlide = useCallback((nextIndex) => {
    const currentIndexValue = currentIndexRef.current
    if (nextIndex === currentIndexValue) return

    currentIndexRef.current = nextIndex
    setPreviousIndex(currentIndexValue)
    setCurrentIndex(nextIndex)
    window.clearTimeout(exitTimerRef.current)
    exitTimerRef.current = window.setTimeout(() => setPreviousIndex(null), 600)
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      goToSlide((currentIndexRef.current + 1) % heroSlides.length)
    }, 5000)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(exitTimerRef.current)
    }
  }, [goToSlide])

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>
      <Suspense fallback={null}><WorldMapCanvas /></Suspense>
      <div className="hero-content container">
        <div className="hero-eyebrow fade-in-up">InfoSecure Solutions</div>
        <div className="hero-carousel hero-carousel-in">
          <div className="hero-carousel-content" aria-live="polite">
            {heroSlides.map((slide, i) => {
              const isActive = i === currentIndex
              const isExiting = i === previousIndex
              if (!isActive && !isExiting) return null

              return <HeroSlide key={i} slide={slide} state={isActive ? 'active' : 'exiting'} />
            })}
          </div>
          <div className="hero-carousel-dots" role="tablist" aria-label="Hero message navigation">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Go to slide ${i + 1}`}
                className={`hero-carousel-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
        </div>
        <div className="hero-contact fade-in-up-delay-3">
          {CONTACT_INFO.map((c, i) => (
            <div key={i} className="hero-contact-item">
              <span className="hero-contact-icon">
                {c.icon === 'mail' ? <MailIcon /> : <PhoneIcon />}
              </span>
              <span className="hero-contact-value">
                {c.href ? (
                  <a href={c.href}>{c.value}</a>
                ) : (
                  c.value
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="hero-metrics fade-in-up-delay-3">
          {[
            { value: '68%', label: 'Alert Reduction' },
            { value: '75%', label: 'Faster Resolution' },
            { value: '43%', label: 'Cost Savings' },
            { value: '200+', label: 'Integrations' },
          ].map((m, i) => (
            <div key={i} className={"metric-item" + (i === 3 ? " fade-in-up-delay-4" : "")}>
              <div className="metric-info">
                <span className="metric-value">{m.value}</span>
                <span className="metric-label">{m.label}</span>
              </div>
              {i < 3 && <div className="metric-divider" />}
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-indicator" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <ArrowDown /><span>Scroll</span>
      </div>
    </section>
  )
}