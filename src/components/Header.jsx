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
    setActiveSection(href)

    const el = document.querySelector(href)
    if (el) {
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
      const top = el.getBoundingClientRect().top + window.scrollY - 96
      window.history.pushState(null, '', href)
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
      return
    }

    window.location.hash = href
  }

  return (
    <header id="header">
      <div className="container">
        <div className="header-inner">
          <a href="#" className="logo" aria-label="Infosecure Solutions home">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Infosecure Solutions" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
            <span className="logo-text"><span className="logo-name">Infosecure</span> <span className="logo-suffix">Solutions</span></span>
          </a>
          <nav className="nav-links">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className={activeSection === l.href ? 'active' : ''} onClick={e => handleNavClick(e, l.href)}>{l.label}</a>
            ))}
            </nav>
          <button className="menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={e => handleNavClick(e, l.href)}>{l.label}</a>
          ))}
        </div>
      </div>
    </header>
  )
}
