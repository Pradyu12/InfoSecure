import { CLIENT_SECTORS, CLIENT_NAMES } from '../data/content'
import { Icon } from '../icons'

export default function Clients() {
  return (
    <section className="section surface-1" id="clients">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Clients</span>
          <h2>Trusted by enterprises<br /><span className="gradient-text">across industries</span></h2>
          <p>From manufacturing to telecom, enterprises rely on InfoSecure Solutions for their Motadata platform deployments.</p>
        </div>
        <div className="clients-grid reveal">
          {CLIENT_SECTORS.map((s, i) => (
            <div key={i} className="client-sector card" style={{ border: 'none', boxShadow: 'none', cursor: 'default' }}>
              <div className="sector-icon"><Icon name={s.icon} /></div>
              <span>{s.name}</span>
            </div>
          ))}
        </div>
        <div className="marquee-card card reveal" style={{ marginTop: '2rem' }}>
          <div className="marquee-label">Trusted by engineering teams at</div>
          <div className="marquee-track">
            <div className="marquee-content">
              {[...CLIENT_NAMES, ...CLIENT_NAMES].map((name, i) => (
                <span key={i}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
