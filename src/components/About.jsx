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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 11.5V8.25A2.75 2.75 0 0 1 9.75 5.5c.28 0 .54.04.79.11" />
                <path d="M10.5 5.5a2.75 2.75 0 0 1 5.5 0v2.75" />
                <path d="M16.5 11.5v3.25a4.25 4.25 0 0 1-8.5 0v-3.25" />
                <path d="M12 17.5v-6" />
                <path d="M8.5 11.5h7" />
                <path d="M12 20.5c-2 0-3.5-1.5-3.5-3.5v-2.5h7v2.5c0 2-1.5 3.5-3.5 3.5Z" />
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
