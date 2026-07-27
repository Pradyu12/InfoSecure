import { useState, useEffect } from 'react'
import { NAV_LINKS, TRUST_BADGES } from '../data/content'
import { useHeaderScroll, useTheme } from '../hooks'
import { MenuIcon, CloseIcon, MoonIcon, SunIcon } from '../icons'

export default function Header() {
  const hidden = useHeaderScroll()
  const { theme, toggle } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection('#' + e.target.id)
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    )
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header id="header" className={hidden ? 'hidden' : ''}>
      <div className="container">
        <div className="header-inner">
          <a href="#" className="logo">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="InfoSecure Solutions" style={{ height: '40px', width: 'auto' }} />
          </a>
          <div className="trust-badges">
            {TRUST_BADGES.map(b => <span key={b} className="trust-badge">{b}</span>)}
          </div>
          <nav className="nav-links">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className={activeSection === l.href ? 'active' : ''} onClick={e => handleNavClick(e, l.href)}>{l.label}</a>
            ))}
            <a href="#contact" className="nav-cta" onClick={e => handleNavClick(e, '#contact')}>Get Started</a>
          </nav>
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
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
