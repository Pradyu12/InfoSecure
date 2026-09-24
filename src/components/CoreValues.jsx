import { CORE_VALUES } from '../data/content'

export default function CoreValues() {
  return (
    <section className="section surface-1" id="values">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}><span className="section-eyebrow">Infosecure Solutions</span></div>
        <div className="section-header reveal">
          <span className="section-tag" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', fontWeight: 400, textTransform: 'none', letterSpacing: '0.02em', marginBottom: '1.5rem', display: 'block', color: 'var(--accent)' }}>Core values</span>
          <p>The principles that guide every deployment, engagement, and long-term partnership.</p>
        </div>
        <div className="values-grid">
          {CORE_VALUES.map((v, i) => (
            <div key={i} className="card value-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="value-num">{v.number}</div>
              <div className="card-title">{v.title}</div>
              <p>{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
