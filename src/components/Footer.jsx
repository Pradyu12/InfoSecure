import { NAV_LINKS } from '../data/content'
import { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon, WhatsappIcon } from '../icons'

export default function Footer() {
  const socials = [
    { icon: InstagramIcon, label: 'Instagram' },
    { icon: FacebookIcon, label: 'Facebook' },
    { icon: YoutubeIcon, label: 'YouTube' },
    { icon: LinkedinIcon, label: 'LinkedIn' },
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
                <span key={i} aria-label={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.25rem', height: '2.25rem', borderRadius: '8px', background: 'rgba(255,255,255,0.06)' }}>
                  <s.icon width="1.1rem" height="1.1rem" color="rgba(255,255,255,0.75)" />
                </span>
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
