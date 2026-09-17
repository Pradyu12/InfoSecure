import { MailIcon, PhoneIcon, ClockIcon, MapPin } from '../icons'

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Get in Touch</span>
          <h2>Contact InfoSecure Solutions</h2>
          <p>Ready to modernize your IT operations, observability, or security posture? Reach out and talk to our team.</p>
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
              <div className="contact-icon"><MapPin /></div>
              <div>
                <div className="contact-label">Headquarters</div>
                <div className="contact-value">Bengaluru, Karnataka, India</div>
              </div>
            </div>
            <div className="contact-note">
              <p>No form to fill — just email us directly or call during business hours. We respond within one business day.</p>
            </div>
          </div>
          <div className="location-map card reveal reveal-right">
            <div className="location-map__header">
              <h3>Find us on the map</h3>
              <div className="location-map__badge">
                <MapPin /> Bengaluru, India
              </div>
            </div>
            <div className="location-map__frame">
              <iframe
                title="InfoSecure Solutions location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227572.06108735955!2d77.3771728666711!3d12.950970084102592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!2m4!1e2!2sInfoSecure%20Solutions!3e2!3m2!1sen!2sin!4v1726124800000!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="location-map__info">
              <p>
                <strong>InfoSecure Solutions</strong><br />
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
