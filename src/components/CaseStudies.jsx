import { CASE_STUDIES } from '../data/content'

export default function CaseStudies() {
  const [spotlight, ...rest] = CASE_STUDIES

  return (
    <section className="section" id="cases">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Case Studies</span>
          <h2>Results-first,<br /><span className="gradient-text">not compliance-first</span></h2>
          <p>Real outcomes from enterprises that moved from fragmented operations to unified Motadata platform.</p>
        </div>
        <div className="cases-tiered reveal">
          <div className="cases-spotlight">
            <div className="card reveal">
              <div className="case-result">{spotlight.result}</div>
              <div className="card-title">{spotlight.title}</div>
              <p>{spotlight.description}</p>
              <div className="case-tags">{spotlight.tags.map(t => <span key={t} className="badge badge-accent">{t}</span>)}</div>
            </div>
          </div>
          <div className="cases-secondary">
            {rest.map((cs, i) => (
              <div key={i} className="card reveal" style={{ transitionDelay: `${(i + 1) * 0.1}s` }}>
                <div className="case-result">{cs.result}</div>
                <div className="card-title">{cs.title}</div>
                <p>{cs.description}</p>
                <div className="case-tags">{cs.tags.map(t => <span key={t} className="badge badge-accent">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
