import { useState } from 'react'
import { MailIcon, PhoneIcon, ClockIcon, SendIcon, CheckCircle } from '../icons'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (honeypot) return
    if (!validate()) return
    setSending(true)
    setFormError('')
    try {
      const pat = import.meta.env.VITE_GITHUB_PAT
      const repo = import.meta.env.VITE_GITHUB_REPO
      if (!pat || !repo) {
        setFormError('Contact form is not configured yet. Please email us directly at info@infosecuresolutions.co.in.')
        return
      }
      const body = [
        `**Name:** ${form.name}`,
        `**Email:** ${form.email}`,
        `**Company:** ${form.company || 'N/A'}`,
        `**Subject:** ${form.subject || 'N/A'}`,
        `**Message:** ${form.message}`
      ].join('\n')
      const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${pat}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({ title: `Contact: ${form.subject || 'General inquiry'} from ${form.name}`, body, labels: ['contact'] })
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
      setForm({ name: '', email: '', company: '', subject: '', message: '' })
    } catch {
      setFormError('Something went wrong. Please try again or email us directly at info@infosecuresolutions.co.in.')
    } finally {
      setSending(false)
    }
  }

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: undefined }))
  }

  if (submitted) {
    return (
      <section className="section" id="contact">
        <div className="container">
          <div className="form-success card" style={{ maxWidth: 500, margin: '0 auto' }}>
            <CheckCircle />
            <h3 style={{ marginBottom: '0.5rem' }}>Message sent!</h3>
            <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you within 24 hours.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Contact</span>
          <h2>Let's discuss your<br /><span className="gradient-text">IT operations</span></h2>
          <p>Reach out to learn how Motadata can transform your observability, ITSM, and infrastructure management.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info reveal reveal-left">
            <h3>Get in touch</h3>
            <div className="contact-detail">
              <div className="contact-icon"><MailIcon /></div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value"><a href="mailto:shankar@infosecuresolutions.co.in">shankar@infosecuresolutions.co.in</a></div>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon"><PhoneIcon /></div>
              <div>
                <div className="contact-label">Phone</div>
                <div className="contact-value"><a href="tel:+919880564227">+91-9880564227</a></div>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon"><ClockIcon /></div>
              <div>
                <div className="contact-label">Hours</div>
                <div className="contact-value">Mon — Sat, 9:00 AM — 6:00 PM IST</div>
              </div>
            </div>
          </div>
          <div className="contact-form card reveal reveal-right">
            <h3>Send a message</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <input tabIndex={-1} type="text" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} />
                  <div className="form-error">{errors.name || ''}</div>
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} />
                  <div className="form-error">{errors.email || ''}</div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Company</label>
                  <input type="text" value={form.company} onChange={e => handleChange('company', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" value={form.subject} onChange={e => handleChange('subject', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea value={form.message} onChange={e => handleChange('message', e.target.value)} />
                <div className="form-error">{errors.message || ''}</div>
              </div>
              {formError && <div className="form-message">{formError}</div>}
              <button type="submit" className="btn-primary" disabled={sending} style={{ width: '100%', justifyContent: 'center' }}>
                {sending ? 'Sending...' : 'Send Message'} <SendIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
