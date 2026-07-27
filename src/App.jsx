import { useEffect, Component } from 'react'
import { useScrollReveal, useLazyRender } from './hooks'
import ScrollProgressBar from './components/ScrollProgressBar'
import Header from './components/Header'
import Hero from './components/Hero'
import MotadataPartner from './components/MotadataPartner'
import About from './components/About'
import Team from './components/Team'
import StatsBand from './components/StatsBand'
import Solutions from './components/Solutions'
import CaseStudies from './components/CaseStudies'
import Clients from './components/Clients'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import BackToTop from './components/BackToTop'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '3rem 1.5rem', textAlign: 'center',
          background: 'var(--surface-1)', borderRadius: 'var(--radius-card)',
          margin: '1rem auto', maxWidth: '600px'
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" style={{ width: 48, height: 48, margin: '0 auto 1rem' }}>
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>
          </svg>
          <h3 style={{ marginBottom: '0.5rem' }}>Something went wrong</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>This section encountered an error. Please try reloading the page.</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      )
    }
    return this.props.children
  }
}

function LazySection({ children }) {
  const { ref, shouldRender } = useLazyRender()
  return <div ref={ref}>{shouldRender ? children : <div style={{ minHeight: 200 }} />}</div>
}

export default function App() {
  useScrollReveal()

  useEffect(() => { document.body.classList.add('loaded') }, [])

  return (
    <>
      <ScrollProgressBar />
      <Header />
      <ErrorBoundary><Hero /></ErrorBoundary>
      <MotadataPartner />
      <ErrorBoundary><About /></ErrorBoundary>
      <Team />
      <StatsBand />
      <LazySection><ErrorBoundary><Solutions /></ErrorBoundary></LazySection>
      <LazySection><ErrorBoundary><CaseStudies /></ErrorBoundary></LazySection>
      <LazySection><ErrorBoundary><Clients /></ErrorBoundary></LazySection>
      <LazySection><ErrorBoundary><Testimonials /></ErrorBoundary></LazySection>
      <LazySection><ErrorBoundary><FAQ /></ErrorBoundary></LazySection>
      <LazySection><ErrorBoundary><Contact /></ErrorBoundary></LazySection>
      <Footer />
      <CookieBanner />
      <BackToTop />
    </>
  )
}
