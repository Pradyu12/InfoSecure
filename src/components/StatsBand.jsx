import { STATS } from '../data/content'

export default function StatsBand() {
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
