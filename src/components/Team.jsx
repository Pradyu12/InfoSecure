import { TEAM_MEMBERS } from '../data/content'

export default function Team() {
  return (
    <section className="section" id="team">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Our Team</span>
          <h2>Experts behind<br /><span className="gradient-text">every deployment</span></h2>
          <p>Certified engineers and consultants with deep Motadata platform expertise across industries.</p>
        </div>
        <div className="team-grid">
          {TEAM_MEMBERS.map((m, i) => (
            <div key={i} className="card team-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="testimonial-avatar" style={{ width: '3.5rem', height: '3.5rem', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {m.initials}
              </div>
              <div className="card-title">{m.name}</div>
              <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.75rem' }}>{m.role}</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {m.tags.map(t => <span key={t} className="badge badge-accent">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
