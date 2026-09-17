import { useState } from 'react'
import { SERVICES } from '../data/content'
import { Icon, ChevronDown } from '../icons'

export default function Services() {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="section surface-1" id="services">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">What we deliver</span>
          <h2>Our Services</h2>
          <p>From architecture to round-the-clock operations — every engagement is built around your outcomes, not just the technology.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="card service-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="card-icon-modern"><Icon name={s.icon} /></div>
              <div className="card-title">{s.title}</div>
              <p>{s.description}</p>
              <button className="solution-toggle" onClick={() => toggle(i)} aria-expanded={openIndex === i}>
                {openIndex === i ? 'Show less' : 'Learn more'}
                <ChevronDown />
              </button>
              <div className={`solution-detail ${openIndex === i ? 'open' : ''}`}>
                <p>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
