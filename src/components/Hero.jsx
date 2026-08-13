import { ArrowDown, CheckCircle, ShieldIcon, ClockIcon } from '../icons'

export default function Hero() {
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
      <div className="hero-content container">
        <div className="hero-eyebrow">Welcome</div>
        <h1>
          <span className="line-1">Ideal Security Solutions</span>
          <span className="line-2">for Your Business</span>
        </h1>
        <p className="hero-sub fade-in-up-delay-2">
          InfoSecure Solutions delivers enterprise-grade security, observability, and IT infrastructure management — trusted by leading organizations across industries.
        </p>
        <div className="hero-ctas fade-in-up-delay-3">
          <a href="#contact" className="btn-primary">Get Started</a>
          <a href="#solutions" className="btn-secondary">Explore Solutions</a>
        </div>
        <div className="hero-trust fade-in-up-delay-3">
          <div className="hero-trust-item"><CheckCircle /> Motadata Certified Partner</div>
          <div className="hero-trust-item"><ShieldIcon /> Enterprise-Grade Security</div>
          <div className="hero-trust-item"><ClockIcon /> 24/7 Support Available</div>
        </div>
        <div className="hero-metrics fade-in-up-delay-3">
          {[
            { value: '68%', label: 'Alert Reduction' },
            { value: '75%', label: 'Faster Resolution' },
            { value: '43%', label: 'Cost Savings' },
            { value: '200+', label: 'Integrations' }
          ].map((m, i) => (
            <div key={i} className="metric-item">
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
