import { useState } from 'react'
import { SOLUTIONS } from '../data/content'
import { Icon, ChevronDown } from '../icons'

export default function Solutions() {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="section surface-1" id="solutions">
      <div className="container">
<div className="section-header reveal">
          <span className="section-tag" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', fontWeight: 800, textTransform: 'none', letterSpacing: '0.3em', marginBottom: '1.5rem', display: 'block', wordSpacing: '1em' }}>SOLUTIONS</span>
        </div>
        <div className="solutions-grid">
          {SOLUTIONS.map((s, i) => (
            <div key={i} className="card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="card-icon-modern"><Icon name={s.icon} /></div>
              <div className="card-title">{s.title}</div>
              <p>{s.description}</p>
              <button className="solution-toggle" onClick={() => toggle(i)}>
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
