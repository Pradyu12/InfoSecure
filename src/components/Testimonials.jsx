import { TESTIMONIALS } from '../data/content'
import { StarIcon } from '../icons'

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Testimonials</span>
          <h2>What Our Clients Say</h2>
          <p>Trusted by enterprises for reliable IT infrastructure and security solutions.</p>
        </div>
        <div className="testimonial-grid reveal">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card testimonial-card">
              <div className="testimonial-stars">
                {Array.from({ length: t.stars }, (_, j) => <StarIcon key={j} />)}
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
          ))}
        </div>
      </div>
    </section>
  )
}
