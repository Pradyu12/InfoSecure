import { useState, useEffect, useRef, useCallback } from 'react'
import { drawTorus } from './utils/canvas'

/* ═══════════════════════════════════════════
   DATA CONSTANTS
   ═══════════════════════════════════════════ */

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Case Studies', href: '#cases' },
  { label: 'Clients', href: '#clients' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' }
]

const TRUST_BADGES = ['Motadata Partner', 'ITSM', 'Observability']

const WORDS = [
  'Observability.',
  'ITSM.',
  'AI-Driven Operations.',
  'Unified Visibility.',
  'Network Analytics.',
  'Log Correlation.'
]

const STATS = [
  { value: 68, suffix: '%', label: 'Reduction in Alert Noise', narrative: 'Across enterprise NOCs using Motadata AIOps' },
  { value: 75, suffix: '%', label: 'Faster Incident Resolution', narrative: 'With unified event correlation and automation' },
  { value: 43, suffix: '%', label: 'Lower Operational Costs', narrative: 'Through platform consolidation and smart routing' },
  { value: 200, suffix: '+', label: 'Enterprise Integrations', narrative: 'Native connectors across IT ecosystem' }
]

const SOLUTIONS = [
  {
    title: 'Full-Stack Observability',
    description: 'Monitor infrastructure, applications, and user experience from a single pane of glass.',
    detail: 'Motadata AIOps unifies metrics, traces, logs, and synthetic monitoring with AI-driven noise reduction, automated root cause analysis, and real-time service topology mapping.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
      </svg>
    )
  },
  {
    title: 'Network Visibility',
    description: 'Deep packet inspection and flow analysis for complete network awareness.',
    detail: 'NetFlow, sFlow, IPFIX, and packet-level analysis with automated topology discovery, bandwidth monitoring, and anomaly detection across LAN, WAN, and SD-WAN.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    )
  },
  {
    title: 'ITSM Platform',
    description: 'Service management that adapts to your workflows, not the other way around.',
    detail: 'Incident, problem, change, asset, and SLA management with AI-assisted ticket routing, self-service portal, CMDB automation, and multi-tenant support.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    )
  },
  {
    title: 'Log Management',
    description: 'Centralized log aggregation with intelligent search and compliance-ready retention.',
    detail: 'Ingest logs from any source, parse and enrich automatically, query with full-text and structured search, and retain with policy-based archival for audit readiness.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    )
  },
  {
    title: 'Infrastructure Monitoring',
    description: 'Physical, virtual, and cloud infrastructure health at your fingertips.',
    detail: 'Agentless and agent-based monitoring for servers, VMs, containers, Kubernetes, AWS, Azure, GCP with auto-discovery, capacity planning, and threshold-based alerting.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    )
  },
  {
    title: 'Compliance & Audit',
    description: 'Automated controls, audit trails, and reporting to simplify certification.',
    detail: 'Pre-built compliance frameworks, automated evidence collection, access reviews, and dashboards aligned to ISO 27001, SOC 2, and internal audit requirements.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  }
]

const CASE_STUDIES = [
  {
    title: 'Manufacturing Leader — NOC Modernization',
    result: '68% alert reduction in 90 days',
    description: 'Replaced fragmented monitoring tools with Motadata AIOps. Consolidated 12 alert sources into a single pane with AI-driven correlation, reducing noise and cutting mean time to resolution from 45 minutes to 14.',
    tags: ['AIOps', 'Alert Correlation', 'NOC']
  },
  {
    title: 'BFSI Firm — Compliance Dashboard',
    result: '40% faster audit cycles',
    description: 'Automated evidence collection and access review workflows across 3 business units. Auditors now pull real-time dashboards instead of manual spreadsheet handoffs.',
    tags: ['Compliance', 'Automation', 'BFSI']
  },
  {
    title: 'Telecom Provider — Network Visibility',
    result: '3x faster fault isolation',
    description: 'Deployed flow-based analysis and packet inspection across 2,400 network devices. Engineers identify and isolate faults before customers notice degradation.',
    tags: ['Network', 'Flow Analysis', 'Telecom']
  }
]

const CLIENT_SECTORS = [
  { name: 'Manufacturing', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M5 20V8l5-4v16"/><path d="M14 20V4l5 4v12"/></svg> },
  { name: 'BFSI', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
  { name: 'Defense', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { name: 'Healthcare', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
  { name: 'Telecom', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg> },
  { name: 'Energy', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { name: 'Logistics', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { name: 'Technology', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> }
]

const CLIENT_NAMES = [
  'Bosch', 'Honeywell', 'L&T', 'State Bank of India', 'Bajaj Finserv',
  'Dr. Reddy\'s', 'NTPC', 'Indian Oil', 'BHEL', 'Tata Communications',
  'Wipro', 'Infosys', 'Reliance Jio', 'Vodafone Idea', 'GAIL',
  'ONGC', 'Coal India', 'Power Grid Corp', 'Hindustan Copper', 'SAIL'
]

const TESTIMONIALS = [
  {
    quote: 'InfoSecure helped us consolidate 12 monitoring tools into a single Motadata platform. Our NOC team now resolves incidents in minutes, not hours.',
    name: 'Rajesh K.',
    role: 'Head of IT Operations, Manufacturing Corp',
    initials: 'RK',
    stars: 5
  },
  {
    quote: 'The compliance dashboard they built saved us 40% effort during our ISO audit cycle. Real-time evidence pulling instead of manual spreadsheet work.',
    name: 'Priya M.',
    role: 'CISO, Regional Bank',
    initials: 'PM',
    stars: 5
  },
  {
    quote: 'Network fault isolation that used to take 2 hours now happens in under 40 minutes. The flow analysis integration was a game changer.',
    name: 'Arun S.',
    role: 'VP Network Engineering, Telecom',
    initials: 'AS',
    stars: 5
  }
]

const FAQ_ITEMS = [
  { q: 'What is InfoSecure Solutions?', a: 'InfoSecure Solutions is a technology services and implementation partner focused on modern IT operations, observability, ITSM, and infrastructure reliability.' },
  { q: 'Which platform does InfoSecure Solutions implement?', a: 'We implement and support the Motadata platform across observability, network visibility, infrastructure, log analytics, APM, and ITSM.' },
  { q: 'What industries do you serve?', a: 'We support manufacturing, BFSI, defense, healthcare, telecom, energy, logistics, and technology organizations with platform-led operations.' },
  { q: 'Do you provide managed support?', a: 'Yes. We offer co-managed and managed operating models with onboarding, tuning, automation, and escalation support.' },
  { q: 'How do you handle compliance and audit needs?', a: 'We configure policy-aligned controls, access reviews, audit trails, and reporting to reduce certification effort.' },
  { q: 'How do I contact InfoSecure Solutions?', a: 'You can reach us at shankar@infosecuresolutions.co.in or +91-9880564227, Monday through Saturday, 9:00 AM to 6:00 PM IST.' }
]

/* ═══════════════════════════════════════════
   CUSTOM HOOKS
   ═══════════════════════════════════════════ */

function useTypewriter(words, interval = 2800) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const tick = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % words.length)
        setVisible(true)
      }, 300)
    }, interval)
    return () => clearInterval(tick)
  }, [words, interval])

  return { text: words[index], visible }
}

function useCounter(target, suffix = '', decimals = 0, duration = 1500) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setValue(target)
        clearInterval(timer)
      } else {
        setValue(current)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, target, duration])

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toString()
  return { ref, text: `${formatted}${suffix}` }
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function useHeaderScroll() {
  const [hidden, setHidden] = useState(false)
  const lastScroll = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setHidden(current > lastScroll.current && current > 100)
      lastScroll.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return hidden
}

function useScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setWidth(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return width
}

function useBackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return visible
}

/* ═══════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════ */

const ChevronDown = () => (
  <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const ArrowDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
  </svg>
)

const ArrowUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
  </svg>
)

const CheckCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" style={{ flexShrink: 0 }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

/* ═══════════════════════════════════════════
   SECTION COMPONENTS
   ═══════════════════════════════════════════ */

function ScrollProgressBar() {
  const width = useScrollProgress()
  return <div id="scroll-progress" style={{ width: `${width}%` }} />
}

function Header() {
  const hidden = useHeaderScroll()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setActiveSection('#' + e.target.id)
          }
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
            {TRUST_BADGES.map(b => (
              <span key={b} className="trust-badge">{b}</span>
            ))}
          </div>

          <nav className="nav-links">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className={activeSection === l.href ? 'active' : ''} onClick={e => handleNavClick(e, l.href)}>
                {l.label}
              </a>
            ))}
            <a href="#contact" className="nav-cta" onClick={e => handleNavClick(e, '#contact')}>Get Started</a>
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

function Hero() {
  const tw = useTypewriter(WORDS)
  const canvasRef = useRef(null)
  const c1 = useCounter(68, '%', 0)
  const c2 = useCounter(75, '%', 0)
  const c3 = useCounter(43, '%', 0)
  const c4 = useCounter(200, '+', 0)

  useEffect(() => {
    if (!canvasRef.current) return
    const cleanup = drawTorus(canvasRef.current)
    return cleanup
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="hero-grid">
        {Array.from({ length: 40 }, (_, i) => {
          const size = ['sm', 'md', 'lg'][i % 3]
          return <div key={i} className={`dot ${size}`} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
        })}
      </div>
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-content container">
        <h1 className="fade-in-up-delay-1">
          <span className="line-1"><span className="gradient-text">Stop Managing</span></span>
          <span className="line-2">Tools. Start Managing IT.</span>
        </h1>

        <div className="typewriter-wrap fade-in-up-delay-2">
          <span className="typewriter-label">Powered by </span>
          <span className={`typewriter ${tw.visible ? '' : ''}`} style={{ opacity: tw.visible ? 1 : 0 }}>{tw.text}</span>
        </div>

        <p className="hero-sub fade-in-up-delay-2">
          InfoSecure Solutions partners with enterprises to deploy Motadata's AI-native observability, ITSM, and infrastructure platform — replacing fragmented tools with unified, intelligent operations.
        </p>

        <div className="hero-ctas fade-in-up-delay-3">
          <a href="#contact" className="btn-primary">Schedule a Demo</a>
          <a href="#solutions" className="btn-secondary">Explore Solutions</a>
        </div>

        <div className="hero-trust fade-in-up-delay-3">
          <div className="hero-trust-item"><CheckCircle /> Motadata Certified Partner</div>
          <div className="hero-trust-item"><ShieldIcon /> Enterprise-Grade Security</div>
          <div className="hero-trust-item"><ClockIcon /> 24/7 Support Available</div>
        </div>

        <div className="hero-metrics fade-in-up-delay-3">
          {[
            { ref: c1.ref, value: c1.text, label: 'Alert Reduction' },
            { ref: c2.ref, value: c2.text, label: 'Faster Resolution' },
            { ref: c3.ref, value: c3.text, label: 'Cost Savings' },
            { ref: c4.ref, value: c4.text, label: 'Integrations' }
          ].map((m, i) => (
            <div key={i} className="metric-item" ref={m.ref}>
              <div className="metric-info">
                <span className="metric-value">{m.value}</span>
                <span className="metric-label">{m.label}</span>
              </div>
              {i < 3 && <div className="metric-divider" />}
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-indicator" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <ArrowDown />
        <span>Scroll</span>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">About Us</span>
          <h2>Built on expertise.<br /><span className="gradient-text">Powered by Motadata.</span></h2>
          <p>We help enterprises move from fragmented, reactive IT operations to unified, intelligent infrastructure management.</p>
        </div>

        <div className="about-grid">
          <div className="about-text reveal reveal-left">
            <h2>A pragmatic approach to<br /><span className="gradient-text">modern IT operations</span></h2>
            <p style={{ marginTop: '1rem' }}>
              InfoSecure Solutions is a technology services partner focused on helping enterprises deploy and operate Motadata's AI-native platform across observability, ITSM, network visibility, and infrastructure monitoring.
            </p>
            <p style={{ marginTop: '0.75rem' }}>
              We combine deep platform expertise with operational experience to deliver measurable outcomes — not just tool deployments. Our team works alongside your engineers to tune, automate, and scale your IT operations.
            </p>
            <p style={{ marginTop: '0.75rem' }}>
              From initial assessment through production deployment and managed support, we ensure your IT team operates with full visibility, faster resolution, and lower costs.
            </p>
          </div>
          <div className="about-cards">
            <div className="card card-tall">
              <div className="card-icon-modern">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                </svg>
              </div>
              <div className="card-title">Platform-First Approach</div>
              <p>We implement Motadata as the single source of truth for observability, ITSM, and infrastructure — eliminating tool sprawl.</p>
            </div>
            <div className="card">
              <div className="card-icon-modern">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="card-title">Expert Implementation</div>
              <p>Certified engineers who've deployed Motadata across manufacturing, BFSI, and telecom environments.</p>
            </div>
            <div className="card">
              <div className="card-icon-modern">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div className="card-title">Measured Outcomes</div>
              <p>Every engagement is tied to KPIs — alert reduction, MTTR, cost savings — that your leadership team cares about.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsBand() {
  return (
    <div className="stats-band">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="stat-item reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="stat-value">{s.value}{s.suffix}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Solutions() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="section" id="solutions">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Solutions</span>
          <h2>Platform capabilities,<br /><span className="gradient-text">delivered end-to-end</span></h2>
          <p>From observability to ITSM, we deploy and operate the Motadata platform across every layer of your IT operations.</p>
        </div>

        <div className="solutions-grid">
          {SOLUTIONS.map((s, i) => (
            <div key={i} className="card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="card-icon-modern">{s.icon}</div>
              <div className="card-title">{s.title}</div>
              <p>{s.description}</p>
              <button className="solution-toggle" onClick={() => toggle(i)}>
                {openIndex === i ? 'Show less' : 'Learn more'}
                <ChevronDown />
              </button>
              <div className={`solution-detail ${openIndex === i ? 'open' : ''}`}>
                <p>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseStudies() {
  return (
    <section className="section surface-1" id="cases">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Case Studies</span>
          <h2>Results-first,<br /><span className="gradient-text">not compliance-first</span></h2>
          <p>Real outcomes from enterprise deployments across manufacturing, BFSI, and telecom.</p>
        </div>

        <div className="cases-tiered">
          <div className="cases-spotlight">
            <div className="card p-6 reveal">
              <div className="case-result">{CASE_STUDIES[0].result}</div>
              <div className="card-title" style={{ fontSize: '1.35rem' }}>{CASE_STUDIES[0].title}</div>
              <p style={{ marginTop: '0.75rem' }}>{CASE_STUDIES[0].description}</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {CASE_STUDIES[0].tags.map(t => <span key={t} className="badge badge-accent">{t}</span>)}
              </div>
            </div>
          </div>
          <div className="cases-secondary">
            {CASE_STUDIES.slice(1).map((cs, i) => (
              <div key={i} className="card p-6 reveal" style={{ transitionDelay: `${(i + 1) * 0.1}s` }}>
                <div className="case-result">{cs.result}</div>
                <div className="card-title">{cs.title}</div>
                <p style={{ marginTop: '0.5rem' }}>{cs.description}</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {cs.tags.map(t => <span key={t} className="badge badge-accent">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Clients() {
  return (
    <section className="section" id="clients">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Clients</span>
          <h2>Trusted across<br /><span className="gradient-text">critical industries</span></h2>
          <p>We serve enterprises where uptime, security, and operational precision are non-negotiable.</p>
        </div>

        <div className="grid-4 gap-5 reveal">
          {CLIENT_SECTORS.map((s, i) => (
            <div key={i} className="client-sector card">
              <div className="sector-icon">{s.icon}</div>
              <span>{s.name}</span>
            </div>
          ))}
        </div>

        <div className="marquee-card card reveal" style={{ marginTop: '2rem' }}>
          <div className="marquee-label">Trusted by leading enterprises</div>
          <div className="marquee-track">
            <div className="marquee-content">
              {[...CLIENT_NAMES, ...CLIENT_NAMES].map((name, i) => (
                <span key={i}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  const intervalRef = useRef(null)

  const goTo = useCallback((i) => {
    setActive(i)
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setActive(prev => (prev + 1) % TESTIMONIALS.length), 5000)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => setActive(prev => (prev + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <section className="section surface-1" id="testimonials">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Testimonials</span>
          <h2>What our clients<br /><span className="gradient-text">say about us</span></h2>
        </div>

        <div className="testimonial-carousel reveal">
          <div className="testimonial-track" style={{ transform: `translateX(-${active * 100}%)` }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">
                  {Array.from({ length: t.stars }, (_, j) => <StarIcon key={j} />)}
                </div>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-dots">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className={`carousel-dot ${active === i ? 'active' : ''}`} onClick={() => goTo(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">FAQ</span>
          <h2>Frequently asked<br /><span className="gradient-text">questions</span></h2>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={`faq-item card reveal ${openIndex === i ? 'open' : ''}`} style={{ transitionDelay: `${i * 0.05}s` }}>
              <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span>{item.q}</span>
                <ChevronDown />
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [honeypot, setHoneypot] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (honeypot) return
    if (!validate()) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      setForm({ name: '', email: '', company: '', subject: '', message: '' })
    }, 1500)
  }

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: undefined }))
  }

  return (
    <section className="section surface-1" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Contact</span>
          <h2>Let's discuss your<br /><span className="gradient-text">IT operations</span></h2>
          <p>Reach out to learn how Motadata can transform your observability, ITSM, and infrastructure management.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info reveal reveal-left">
            <h3>Get in Touch</h3>
            <div className="contact-row">
              <div className="contact-icon"><MailIcon /></div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value"><a href="mailto:shankar@infosecuresolutions.co.in">shankar@infosecuresolutions.co.in</a></div>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon"><PhoneIcon /></div>
              <div>
                <div className="contact-label">Phone</div>
                <div className="contact-value"><a href="tel:+919880564227">+91-9880564227</a></div>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon"><ClockIcon /></div>
              <div>
                <div className="contact-label">Hours</div>
                <div className="contact-value">Mon–Sat, 9:00 AM – 6:00 PM IST</div>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <div className="contact-label">Address</div>
                <div className="contact-value">#8 Sneha Residency, HSR Layout, Bangalore, Karnataka 560102</div>
              </div>
            </div>
          </div>

          <div className="contact-form card reveal reveal-right">
            {submitted ? (
              <div className="form-msg form-success" style={{ padding: '2rem', textAlign: 'center' }}>
                <CheckCircle />
                <h3 style={{ marginTop: '1rem' }}>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3>Send a Message</h3>
                <div className="honeypot">
                  <input type="text" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex="-1" autoComplete="off" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" placeholder="Your Name *" value={form.name} onChange={e => handleChange('name', e.target.value)} className={errors.name ? 'error' : ''} />
                    <span className="form-error">{errors.name || ''}</span>
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Email Address *" value={form.email} onChange={e => handleChange('email', e.target.value)} className={errors.email ? 'error' : ''} />
                    <span className="form-error">{errors.email || ''}</span>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" placeholder="Company" value={form.company} onChange={e => handleChange('company', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Subject" value={form.subject} onChange={e => handleChange('subject', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message *" rows="5" value={form.message} onChange={e => handleChange('message', e.target.value)} className={errors.message ? 'error' : ''} />
                  <span className="form-error">{errors.message || ''}</span>
                </div>
                <button type="submit" className="btn-primary w-full" disabled={sending}>
                  {sending ? (
                    <span className="spinner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeDasharray="30 60" /></svg>
                      Sending...
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <SendIcon /> Send Message
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="logo" style={{ gap: '0.5rem' }}>
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="InfoSecure Solutions" style={{ height: '20px', width: 'auto' }} />
          </div>
          <div className="footer-text">&copy; {new Date().getFullYear()} InfoSecure Solutions. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#about" className="footer-text" style={{ transition: 'color 0.2s' }}>About</a>
            <a href="#solutions" className="footer-text" style={{ transition: 'color 0.2s' }}>Solutions</a>
            <a href="#contact" className="footer-text" style={{ transition: 'color 0.2s' }}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-accepted')
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-accepted', 'true')
    setVisible(false)
  }

  return (
    <div className={`cookie-banner ${visible ? '' : 'hidden'}`}>
      <div className="cookie-content">
        <div className="cookie-text">
          We use cookies to improve your experience. By continuing, you agree to our use of cookies.{' '}
          <a href="#privacy">Learn more</a>
        </div>
        <div className="cookie-actions">
          <button className="cookie-decline" onClick={accept}>Decline</button>
          <button className="btn-primary cookie-btn" onClick={accept}>Accept</button>
        </div>
      </div>
    </div>
  )
}

function BackToTop() {
  const visible = useBackToTop()

  return (
    <button
      id="back-to-top"
      className={visible ? 'visible' : ''}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ArrowUp />
    </button>
  )
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */

export default function App() {
  useScrollReveal()

  useEffect(() => {
    document.body.classList.add('loaded')
  }, [])

  return (
    <>
      <ScrollProgressBar />
      <Header />
      <Hero />
      <About />
      <StatsBand />
      <Solutions />
      <CaseStudies />
      <Clients />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <CookieBanner />
      <BackToTop />
    </>
  )
}
