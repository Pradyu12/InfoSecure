import { useCounter } from '../hooks'
import { STATS } from '../data/content'

function StatItem({ s, i }) {
  const { ref, text } = useCounter(s.value, s.suffix)
  return (
    <div className="stat-item reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
      <div className="stat-value" ref={ref}>{text}</div>
      <div className="stat-label">{s.label}</div>
    </div>
  )
}

export default function StatsBand() {
  return (
    <section className="stats-band" id="stats">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}><span className="section-eyebrow"><span>Infosecure</span> <span class="eyebrow-solutions">Solutions</span></span></div>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <StatItem key={i} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
