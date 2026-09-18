import { NAV_LINKS } from '../data/content'
import { WhatsappIcon } from '../icons'

export default function Footer() {
  const socials = [
    { src: '/icons/icons8-instagram-48.png', alt: 'Instagram' },
    { src: '/icons/icons8-facebook-48.png', alt: 'Facebook' },
    { src: '/icons/icons8-youtube-48.png', alt: 'YouTube' },
    { src: '/icons/icons8-linkedin-48.png', alt: 'LinkedIn' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="InfoSecure Solutions" style={{ height: '32px', width: 'auto' }} />
            <p>InfoSecure Solutions — official Motadata implementation partner delivering AI-native observability, ITSM, and infrastructure management for enterprise IT operations.</p>
            <div className="footer-socials" style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {socials.map((s, i) => (
                <img key={i} src={s.src} alt={s.alt} style={{ width: '1.5rem', height: '1.5rem', borderRadius: '8px', opacity: 0.75, transition: 'opacity 0.2s' }} />
              ))}
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            {NAV_LINKS.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          </div>
          <div>
            <h4>Contact</h4>
            <a href="https://wa.me/919880564227" target="_blank" rel="noopener noreferrer" className="contact-whatsapp">
              <WhatsappIcon width="1rem" height="1rem" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.4rem' }} />
              Chat on WhatsApp
            </a>
            <a href="tel:+919880564227">+91-9880564227</a>
            <a href="#contact">Get in touch</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} InfoSecure Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
