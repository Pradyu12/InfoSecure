export default function CTABand({ eyebrow, title, description, cta = 'Get Started', href = '#contact' }) {
  return (
    <section className="cta-band">
      <div className="container">
        <div className="reveal">
          <span className="section-tag">{eyebrow}</span>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
          <a href={href} className="btn-light">{cta}</a>
        </div>
      </div>
    </section>
  )
}
