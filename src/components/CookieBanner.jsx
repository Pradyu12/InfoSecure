import { useState, useEffect } from 'react'

export default function CookieBanner() {
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
          We use cookies to improve your experience. By continuing, you agree to our use of cookies.
        </div>
        <div className="cookie-actions">
          <button className="cookie-decline" onClick={accept}>Decline</button>
          <button className="btn-primary cookie-btn" onClick={accept}>Accept</button>
        </div>
      </div>
    </div>
  )
}
