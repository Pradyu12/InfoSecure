export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">About Us</span>
          <h2>Built on expertise.<br /><span className="gradient-text">Powered by Motadata.</span></h2>
          <p>We help enterprises move from fragmented, reactive IT operations to unified, intelligent infrastructure management.</p>
        </div>
        <div className="about-grid">
          <div className="about-text reveal reveal-left">
            <h2>A pragmatic approach to<br /><span className="gradient-text">modern IT operations</span></h2>
            <p style={{ marginTop: '1rem' }}>
              InfoSecure Solutions is a technology services partner focused on helping enterprises deploy and operate Motadata's AI-native platform across observability, ITSM, network visibility, and infrastructure monitoring.
            </p>
            <p style={{ marginTop: '0.75rem' }}>
              We combine deep platform expertise with operational experience to deliver measurable outcomes — not just tool deployments. Our team works alongside your engineers to tune, automate, and scale your IT operations.
            </p>
            <p style={{ marginTop: '0.75rem' }}>
              From initial assessment through production deployment and managed support, we ensure your IT team operates with full visibility, faster resolution, and lower costs.
            </p>
          </div>
          <div className="about-cards">
            <div className="card card-tall">
              <div className="card-icon-modern">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                </svg>
              </div>
              <div className="card-title">Platform-First Approach</div>
              <p>We implement Motadata as the single source of truth for observability, ITSM, and infrastructure — eliminating tool sprawl.</p>
            </div>
            <div className="card">
              <div className="card-icon-modern">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="card-title">Expert Implementation</div>
              <p>Certified engineers who've deployed Motadata across manufacturing, BFSI, and telecom environments.</p>
            </div>
            <div className="card">
              <div className="card-icon-modern">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div className="card-title">Measured Outcomes</div>
              <p>Every engagement is tied to KPIs — alert reduction, MTTR, cost savings — that your leadership team cares about.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
