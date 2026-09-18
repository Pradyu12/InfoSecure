import { lazy, Suspense, useState, useEffect } from 'react'
import { ArrowDown, MailIcon, MapPin, PhoneIcon } from '../icons'
import { CONTACT_INFO } from '../data/content'

const WorldMapCanvas = lazy(() => import('./WorldMapCanvas'))

const heroMessages = [
  "Ideal Security Solutions for Your Business.",
  "InfoSecure Solutions unifies enterprise security, deep observability, and IT management into one seamless defense system."
]

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroMessages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hero-carousel fade-in-up-delay-2">
      <p className="hero-carousel-text" style={{ opacity: 1 }}>
        {heroMessages[currentIndex]}
      </p>
      <div className="hero-carousel-dots" role="tablist" aria-label="Hero message navigation">
        {heroMessages.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`Go to message ${i + 1}`}
            className={`hero-carousel-dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>
      <Suspense fallback={null}><WorldMapCanvas /></Suspense>
      <div className="hero-content container">
        <div className="hero-eyebrow fade-in-up">InfoSecure Solutions</div>
        <h1>
          <span className="line-1 gradient-text">Ideal Security Solutions</span>
          <span className="line-2">for Your Business</span>
        </h1>
        <HeroCarousel />
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