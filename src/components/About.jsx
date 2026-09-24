import aboutTeam from '../assets/about-team.webp'
import { MISSION, VISION } from '../data/content'

const HIGHLIGHTS = [
  { value: '15+', label: 'Years of expertise' },
  { value: '200+', label: 'Integrations delivered' },
  { value: '100+', label: 'Successful customers' },
  { value: '12+ ', label: 'Global technology partners' },
]

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text reveal reveal-left">
            <span className="section-tag" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', fontWeight: 400, textTransform: 'none', letterSpacing: '0.02em', marginBottom: '1.5rem', display: 'block' }}>About us</span>
            <p>
              Founded in 2015 and headquartered in Bengaluru, Karnataka — India&rsquo;s technology capital — Infosecure Solutions has grown from a specialist security integrator into a full-spectrum technology partner. Today we design, deploy, and manage the infrastructure that keeps enterprises running: cybersecurity, network solutions, data centers, virtualization, and cloud.
            </p>
            <p>
              What sets us apart is accountability. Our certified engineers don&rsquo;t just install technology — they own outcomes. Whether it&rsquo;s cutting bandwidth costs by 75%, reducing alert noise by 68%, or keeping mission-critical systems online around the clock, we measure ourselves by the results our clients see on their balance sheets and dashboards.
            </p>
            <div className="about-highlights">
              {HIGHLIGHTS.map((h, i) => (
                <div key={i} className="about-highlight">
                  <span className="about-highlight-value">{h.value}</span>
                  <span className="about-highlight-label">{h.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-media reveal reveal-right">
            <div className="about-img-frame">
              <img src={aboutTeam} alt="Infosecure Solutions team" width="1280" height="854" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="mv-grid reveal">
          <div className="card mv-card">
            <div className="mv-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="7.5" />
                <circle cx="12" cy="12" r="4.25" />
                <path d="M12 2.75v3.25" />
                <path d="M12 18v3.25" />
                <path d="M2.75 12h3.25" />
                <path d="M18 12h3.25" />
                <path d="M14.6 9.4 18.2 5.8" />
                <path d="M9.4 14.6 5.8 18.2" />
                <path d="M12 12l5-5" />
                <path d="M12 12l-5 5" />
              </svg>
            </div>
            <h3>Our Mission</h3>
            <p>{MISSION}</p>
          </div>
          <div className="card mv-card">
            <div className="mv-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12c2.2-4.2 5.3-6.3 10-6.3S19.8 7.8 22 12c-2.2 4.2-5.3 6.3-10 6.3S4.2 16.2 2 12Z" />
                <circle cx="12" cy="12" r="3.25" />
                <path d="M12 2v3" />
                <path d="M12 19v3" />
              </svg>
            </div>
            <h3>Our Vision</h3>
            <p>{VISION}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
