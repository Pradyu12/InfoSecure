import aboutTeam from '../assets/about-team.webp'
import { MISSION, VISION } from '../data/content'

const HIGHLIGHTS = [
  { value: '15+', label: 'Years of expertise' },
  { value: '200+', label: 'Integrations delivered' },
  { value: '24/7', label: 'NOC-managed operations' },
  { value: '12+', label: 'Global technology partners' },
]

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text reveal reveal-left">
            <span className="section-tag">About us</span>
            <h2>About InfoSecure Solutions</h2>
            <p>
              Founded in 2015 and headquartered in Bengaluru, Karnataka — India&rsquo;s technology capital — InfoSecure Solutions has grown from a specialist security integrator into a full-spectrum technology partner. Today we design, deploy, and manage the infrastructure that keeps enterprises running: cybersecurity, network solutions, data centers, virtualization, and cloud.
            </p>
            <p>
              What sets us apart is accountability. Our certified engineers don&rsquo;t just install technology — they own outcomes. Whether it&rsquo;s cutting bandwidth costs by 75%, reducing alert noise by 68%, or keeping mission-critical systems online 24/7, we measure ourselves by the results our clients see on their balance sheets and dashboards.
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
              <img src={aboutTeam} alt="InfoSecure Solutions team" width="1280" height="854" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="mv-grid reveal">
          <div className="card mv-card">
            <div className="mv-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h3>Our Mission</h3>
            <p>{MISSION}</p>
          </div>
          <div className="card mv-card">
            <div className="mv-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3>Our Vision</h3>
            <p>{VISION}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
