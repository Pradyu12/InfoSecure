import { useState } from 'react'
import { TESTIMONIALS } from '../data/content'
import { StarIcon } from '../icons'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const t = TESTIMONIALS[active]

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Testimonials</span>
          <h2>What our<br /><span className="gradient-text">partners say</span></h2>
          <p>Hear from the teams we work with across industries.</p>
        </div>
        <div className="testimonial-carousel reveal">
          <div className="card testimonial-card">
            <div className="testimonial-stars">
              {Array.from({ length: t.stars }, (_, i) => <StarIcon key={i} />)}
            </div>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.initials}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            </div>
          </div>
          <div className="carousel-dots">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className={`carousel-dot ${i === active ? 'active' : ''}`} onClick={() => setActive(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
