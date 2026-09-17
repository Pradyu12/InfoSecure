import { NAV_LINKS } from '../data/content'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="InfoSecure Solutions" style={{ height: '32px', width: 'auto' }} />
            <p>InfoSecure Solutions — official Motadata implementation partner delivering AI-native observability, ITSM, and infrastructure management for enterprise IT operations.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            {NAV_LINKS.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          </div>
          <div>
            <h4>Contact</h4>
            <a href="mailto:support@infosecuresolutions.co.in">support@infosecuresolutions.co.in</a>
            <a href="tel:+919880564227">+91-9880564227</a>
            <a href="#contact">Get in touch</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} InfoSecure Solutions. All rights reserved.</p>
          <p>Powered by Motadata</p>
        </div>
      </div>
    </footer>
  )
}
