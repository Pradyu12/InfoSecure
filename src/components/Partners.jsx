import { PARTNER_NAMES } from '../data/content'

export default function Partners() {
  const items = [...PARTNER_NAMES, ...PARTNER_NAMES]
  return (
    <section className="section surface-1" id="partners">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Partners</span>
          <h2>Our technology<br /><span className="gradient-text">partners</span></h2>
          <p>We implement, integrate, and support best-of-breed platforms alongside our global partners.</p>
        </div>
        <div className="marquee-card card reveal">
          <div className="marquee-label">In partnership with</div>
          <div className="marquee-track">
            <div className="marquee-content partners-marquee">
              {items.map((name, i) => (
                <span className="partner-item" key={`${name}-${i}`}>
                  <span className="partner-dot" aria-hidden="true" />
                  <span className="partner-name">{name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
