import { MailIcon, PhoneIcon, ClockIcon } from '../icons'

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', fontWeight: 400, textTransform: 'none', letterSpacing: '0.02em', marginBottom: '1.5rem', display: 'block' }}>Contact US</span>
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
                   <a href="tel:+918088577002">+91-8088577002</a>
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
                <div className="contact-value">G 1, Ground Floor, Site No. 6, Vishnu Priya Apartment, 12th Main Road, 4th Cross, Gaurav Nagar, JP Nagar 7th Phase, Bengaluru – 560 078</div>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={`${import.meta.env.BASE_URL}icons/icons8-location-48.png`} alt="Location" style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <div>
                <div className="contact-label">Operational Office</div>
                <div className="contact-value">4th Floor, Annapoorna Industrial Compound, Kanakapura Main Rd, next to Temple Tree Apartments, Kanakanagar, Ilyas Nagar, J. P. Nagar, Bengaluru, Karnataka-560111</div>
              </div>
            </div>
          </div>
          <div className="location-map card reveal reveal-right">
            <div className="location-map__header">
              <h3>Operational Office Location</h3>
              <div className="location-map__badge">
                <img src={`${import.meta.env.BASE_URL}icons/icons8-location-48.png`} alt="Location" style={{ width: '0.9rem', height: '0.9rem' }} /> Bengaluru, India
              </div>
            </div>
            <div className="location-map__frame">
              <iframe
                title="Infosecure Solutions Operational Office location"
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
                <strong>Infosecure Solutions</strong><br />
                Operational Office<br />
                4th Floor, Annapoorna Industrial Compound,<br />
                Kanakapura Main Rd, next to Temple Tree Apartments, Kanakanagar,<br />
                Ilyas Nagar, J. P. Nagar, Bengaluru, Karnataka-560111
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
