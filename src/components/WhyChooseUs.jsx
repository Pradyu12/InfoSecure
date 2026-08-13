import { VALUE_PROPS } from '../data/content'
import { Icon } from '../icons'

export default function WhyChooseUs() {
  return (
    <section className="section" id="why-us">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Why Choose Us</span>
          <h2>Discover Our Unique Value Propositions</h2>
          <p>At Infosecure Solutions, we set ourselves apart through our tailored services and commitment to excellence.</p>
        </div>
        <div className="why-grid">
          {VALUE_PROPS.map((vp, i) => (
            <div key={i} className="card why-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="card-icon-modern"><Icon name={vp.icon} /></div>
              <div className="card-title">{vp.title}</div>
              <p>{vp.description}</p>
              <span className="why-highlight">{vp.highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
