import aboutTeam from '../assets/about-team.jpg'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text reveal reveal-left">
            <span className="section-tag">About us</span>
            <h2>About Infosecure Solutions</h2>
            <p>
              Founded in 2015 and headquartered in Bengaluru, InfoSecure Solutions is a trusted technology services partner specializing in enterprise IT infrastructure, security, and managed operations. With over 15 years of combined experience, we help organizations modernize their IT landscape through strategic implementation of cutting-edge platforms.
            </p>
            <p>
              We partner with enterprises to deliver measurable outcomes — from reducing alert noise and mean time to resolution to ensuring 24/7 operational excellence. Our team of certified engineers works alongside your IT staff to deploy, tune, and manage solutions that drive real business value.
            </p>
            <a href="#solutions" className="btn-primary" style={{ marginTop: '1.5rem' }}>Read More</a>
          </div>
          <div className="about-media reveal reveal-right">
            <div className="about-img-frame">
              <img src={aboutTeam} alt="InfoSecure Solutions team" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
