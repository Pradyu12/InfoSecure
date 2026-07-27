export default function MotadataPartner() {
  return (
    <div className="partner-section">
      <div className="container">
        <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Technology Partner
        </p>
        <img
          src={`${import.meta.env.BASE_URL}motadata-logo.png`}
          alt="Motadata by Mindtraq"
          style={{ height: '48px', width: 'auto', margin: '0 auto 1.5rem', display: 'block' }}
        />
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
          Official Motadata implementation partner — deploying AI-native observability,
          ITSM, and infrastructure platform for enterprise IT operations.
        </p>
      </div>
    </div>
  )
}
