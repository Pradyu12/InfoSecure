import { useState, useEffect } from 'react'
import { NAV_LINKS } from '../data/content'
import { MenuIcon, CloseIcon } from '../icons'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observed = new WeakSet()
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection('#' + e.target.id)
        })
      },
      { threshold: 0.3, rootMargin: '-90px 0px -40% 0px' }
    )

    const observeSections = () => {
      document.querySelectorAll('section[id]').forEach(s => {
        if (!observed.has(s)) { observed.add(s); observer.observe(s) }
      })
    }
    observeSections()

    // sections below the fold are lazily mounted — re-observe as they appear
    const mo = new MutationObserver(observeSections)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => { observer.disconnect(); mo.disconnect() }
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header id="header">
      <div className="container">
        <div className="header-inner">
          <a href="#" className="logo">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="InfoSecure Solutions" style={{ height: '56px', width: 'auto' }} />
          </a>
          <nav className="nav-links">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className={activeSection === l.href ? 'active' : ''} onClick={e => handleNavClick(e, l.href)}>{l.label}</a>
            ))}
            <a href="#contact" className="nav-cta" onClick={e => handleNavClick(e, '#contact')}>Get Started</a>
            <a href="#solutions" className="btn-secondary" style={{ padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-btn)', fontWeight: 600, fontSize: '0.9rem', border: '1px solid var(--card-border)', transition: 'background 0.25s, color 0.25s, border-color 0.25s, transform 0.25s', background: 'var(--surface-0)', color: 'var(--text-secondary)' }} onClick={e => handleNavClick(e, '#solutions')}>Explore Solutions</a>
          </nav>
          <button className="menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={e => handleNavClick(e, l.href)}>{l.label}</a>
          ))}
          <a href="#contact" className="nav-cta" onClick={e => handleNavClick(e, '#contact')}>Get Started</a>
        </div>
      </div>
    </header>
  )
}
