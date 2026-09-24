export default function Partners() {
  const partners = [
    { name: 'Sophos', src: `${import.meta.env.BASE_URL}icons/sophos.png` },
    { name: 'Microsoft', src: `${import.meta.env.BASE_URL}icons/microsoft.png` },
    { name: 'Motadata', src: `${import.meta.env.BASE_URL}icons/motadata-logo.png` },
    { name: 'Dell', src: `${import.meta.env.BASE_URL}icons/dell-com-logo.png` },
    { name: 'CrowdStrike', src: `${import.meta.env.BASE_URL}icons/crowdstrike.com.png` },
    { name: 'Lenovo', src: `${import.meta.env.BASE_URL}icons/lenovo.png` },
    { name: 'HPE', src: '' },
    { name: 'Netwrix', src: '' },
    { name: 'DataResolve', src: '' },
    { name: 'Sharp Business Systems', src: '' },
    { name: 'Veeam', src: '' },
  ]
  const items = [...partners, ...partners]
  return (
    <section className="section surface-1" id="partners">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', fontWeight: 400, textTransform: 'none', letterSpacing: '0.02em', marginBottom: '1.5rem', display: 'block' }}>Partners</span>
        </div>
        <div className="marquee-card card reveal">
          <div className="marquee-track">
            <div className="marquee-content partners-marquee" style={{ alignItems: 'center', gap: '3rem' }}>
              {items.map((p, i) => (
                <span className="partner-item" key={`${p.name}-${i}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px', minWidth: '120px', opacity: 1, transition: 'opacity 0.2s, transform 0.2s' }}>
                  {p.src && <img src={p.src} alt={p.name} style={{ height: '48px', width: 'auto', maxWidth: '160px', objectFit: 'contain' }} />}
                  {!p.src && <span className="partner-name" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', minWidth: '120px', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.02em', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>{p.name}</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
