import { MailIcon, PhoneIcon, ClockIcon, MapPin } from '../icons'

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', fontWeight: 400, textTransform: 'none', letterSpacing: '0.02em', marginBottom: '1.5rem', display: 'block' }}>Contact</span>
        </div>
        <div className="contact-grid">
          <div className="contact-info reveal reveal-left">
            <h3>Where to find us</h3>
            <div className="contact-detail">
              <div className="contact-icon"><MailIcon /></div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value">
                  <a href="mailto:support@infosecuresolutions.co.in">support@infosecuresolutions.co.in</a>
                </div>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon"><PhoneIcon /></div>
              <div>
                <div className="contact-label">Phone</div>
                <div className="contact-value">
                  <a href="tel:+919880564227">+91-9880564227</a>
                </div>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon"><ClockIcon /></div>
              <div>
                <div className="contact-label">Hours</div>
                <div className="contact-value">Mon — Sat, 9:00 AM — 6:00 PM IST</div>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={`${import.meta.env.BASE_URL}icons/icons8-location-48.png`} alt="Location" style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <div>
                <div className="contact-label">Registered Office</div>
                <div className="contact-value">Kothnur, Gaurav Nagar, JP Nagar 7th Phase, J. P. Nagar, Bengaluru, Karnataka 560062</div>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={`${import.meta.env.BASE_URL}icons/icons8-location-48.png`} alt="Location" style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <div>
                <div className="contact-label">Working Office</div>
                <div className="contact-value">Bengaluru, Karnataka, India</div>
              </div>
            </div>
          </div>
          <div className="location-map card reveal reveal-right">
            <div className="location-map__header">
              <h3>Working Office Location</h3>
              <div className="location-map__badge">
                <MapPin /> Bengaluru, India
              </div>
            </div>
            <div className="location-map__frame">
              <iframe
                title="InfoSecure Solutions Working Office location"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3889.0532736505547!2d77.56959307429898!3d12.904295987404929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDU0JzE1LjUiTiA3N8KwMzQnMTkuOCJF!5e0!3m2!1sen!2sin!4v1789707651927!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="location-map__info">
              <p>
                <strong>InfoSecure Solutions</strong><br />
                Working Office<br />
                Bengaluru, Karnataka<br />
                India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
