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
          <span className="section-tag" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', fontWeight: 800, textTransform: 'none', letterSpacing: '0.3em', marginBottom: '1.5rem', display: 'block', wordSpacing: '1em' }}>SERVICES</span>
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
