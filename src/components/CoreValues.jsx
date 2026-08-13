import { CORE_VALUES } from '../data/content'

export default function CoreValues() {
  return (
    <section className="section surface-1" id="values">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Our values</span>
          <h2>Our Core Values</h2>
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
