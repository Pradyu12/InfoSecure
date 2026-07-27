import { useRef, useEffect } from 'react'
import { WORDS } from '../data/content'
import { useTypewriter, useCounter } from '../hooks'
import { drawTorus } from '../utils/canvas'
import { ArrowDown, CheckCircle, ShieldIcon, ClockIcon } from '../icons'

export default function Hero() {
  const tw = useTypewriter(WORDS)
  const canvasRef = useRef(null)
  const c1 = useCounter(68, '%', 0)
  const c2 = useCounter(75, '%', 0)
  const c3 = useCounter(43, '%', 0)
  const c4 = useCounter(200, '+', 0)

  useEffect(() => {
    if (!canvasRef.current) return
    const cleanup = drawTorus(canvasRef.current)
    return cleanup
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>
      <div className="hero-grid">
        {Array.from({ length: 40 }, (_, i) => {
          const size = ['sm', 'md', 'lg'][i % 3]
          return <div key={i} className={`dot ${size}`} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
        })}
      </div>
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-content container">
        <h1 className="fade-in-up-delay-1">
          <span className="line-1"><span className="gradient-text">Stop Managing</span></span>
          <span className="line-2">Tools. Start Managing IT.</span>
        </h1>
        <div className="typewriter-wrap fade-in-up-delay-2">
          <span className="typewriter-label">Powered by </span>
          <span className="typewriter" style={{ opacity: tw.visible ? 1 : 0 }}>{tw.text}</span>
        </div>
        <p className="hero-sub fade-in-up-delay-2">
          InfoSecure Solutions partners with enterprises to deploy Motadata's AI-native observability, ITSM, and infrastructure platform — replacing fragmented tools with unified, intelligent operations.
        </p>
        <div className="hero-ctas fade-in-up-delay-3">
          <a href="#contact" className="btn-primary">Schedule a Demo</a>
          <a href="#solutions" className="btn-secondary">Explore Solutions</a>
        </div>
        <div className="hero-trust fade-in-up-delay-3">
          <div className="hero-trust-item"><CheckCircle /> Motadata Certified Partner</div>
          <div className="hero-trust-item"><ShieldIcon /> Enterprise-Grade Security</div>
          <div className="hero-trust-item"><ClockIcon /> 24/7 Support Available</div>
        </div>
        <div className="hero-metrics fade-in-up-delay-3">
          {[
            { ref: c1.ref, value: c1.text, label: 'Alert Reduction' },
            { ref: c2.ref, value: c2.text, label: 'Faster Resolution' },
            { ref: c3.ref, value: c3.text, label: 'Cost Savings' },
            { ref: c4.ref, value: c4.text, label: 'Integrations' }
          ].map((m, i) => (
            <div key={i} className="metric-item" ref={m.ref}>
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
