import { lazy, Suspense, useState, useEffect } from 'react'
import { ArrowDown, MailIcon, MapPin, PhoneIcon } from '../icons'
import { CONTACT_INFO } from '../data/content'

const WorldMapCanvas = lazy(() => import('./WorldMapCanvas'))

const heroSlides = [
  {
    h1Line1: "Complete Control",
    h1Line2: "Over Your Digital Ecosystem",
    subtitle: "Ideal Security Solutions for Your Business."
  },
  {
    h1Line1: "Complete Control Over",
    h1Line2: "Your Digital Ecosystem",
    subtitle: "InfoSecure Solutions unifies enterprise security, deep observability, and IT management into one seamless defense system."
  }
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentSlide = heroSlides[currentIndex]

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>
      <Suspense fallback={null}><WorldMapCanvas /></Suspense>
      <div className="hero-content container">
        <div className="hero-eyebrow fade-in-up">InfoSecure Solutions</div>
        <h1 className="hero-title">
          <span className="line-1 gradient-text">{currentSlide.h1Line1}</span>
          <span className="line-2">{currentSlide.h1Line2}</span>
        </h1>
        <div className="hero-carousel fade-in-up-delay-2">
          <p className="hero-carousel-text" style={{ opacity: 1 }}>
            {currentSlide.subtitle}
          </p>
          <div className="hero-carousel-dots" role="tablist" aria-label="Hero message navigation">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Go to slide ${i + 1}`}
                className={`hero-carousel-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(i)}
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