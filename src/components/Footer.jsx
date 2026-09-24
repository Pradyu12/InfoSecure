import { NAV_LINKS } from '../data/content'

export default function Footer() {
  const socials = [
    { src: `${import.meta.env.BASE_URL}icons/icons8-instagram-48.png`, alt: 'Instagram' },
    { src: `${import.meta.env.BASE_URL}icons/icons8-facebook-48.png`, alt: 'Facebook' },
    { src: `${import.meta.env.BASE_URL}icons/icons8-youtube-48.png`, alt: 'YouTube' },
    { src: `${import.meta.env.BASE_URL}icons/icons8-linkedin-48.png`, alt: 'LinkedIn' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Infosecure Solutions" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
            <p>Infosecure Solutions — delivering AI-native observability, ITSM, and infrastructure management for enterprise IT operations.</p>
            <div className="footer-socials" style={{ marginTop: '1.25rem', display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {socials.map((s, i) => (
                <img key={i} src={s.src} alt={s.alt} style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '9px', opacity: 0.9, transition: 'opacity 0.2s, transform 0.2s' }} />
              ))}
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            {NAV_LINKS.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          </div>
          <div>
            <h4>Contact</h4>
            <a href="tel:+918088577002">+91-8088577002</a>
            <a href="#contact">Get in touch</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Infosecure Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
