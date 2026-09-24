import { useState } from 'react'
import { FAQ_ITEMS } from '../data/content'
import { ChevronDown } from '../icons'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="section surface-1" id="faq">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}><span className="section-eyebrow">Infosecure Solutions</span></div>
        <div className="section-header reveal">
          <span className="section-tag">FAQ</span>
          <h2>Quick<br /><span className="gradient-text">answers</span></h2>
          <p>Common questions about Infosecure Solutions and our Motadata platform services.</p>
        </div>
        <div className="faq-list reveal">
          {FAQ_ITEMS.map((faq, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => toggle(i)}>
                <span>{faq.q}</span>
                <ChevronDown />
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
