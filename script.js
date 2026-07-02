/* ═══════════════════════════════════════════
   InfoSecure — Script
   ═══════════════════════════════════════════ */

/* ── 3D Hero Torus ── */
function initHero3D() {
  const canvas = document.getElementById('hero-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  let w, h, cx, cy, sc

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect()
    w = canvas.width = rect.width * devicePixelRatio
    h = canvas.height = rect.height * devicePixelRatio
    cx = w / 2
    cy = h / 2
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'
    sc = Math.min(w, h) * 0.13
  }

  resize()
  window.addEventListener('resize', resize)

  const R = 4, r = 1.6, uSegs = 32, vSegs = 14, focal = 8
  const verts = []

  for (let ui = 0; ui < uSegs; ui++) {
    const u = (ui / uSegs) * Math.PI * 2
    for (let vi = 0; vi < vSegs; vi++) {
      const v = (vi / vSegs) * Math.PI * 2
      verts.push({
        x: (R + r * Math.cos(v)) * Math.cos(u),
        y: (R + r * Math.cos(v)) * Math.sin(u),
        z: r * Math.sin(v),
      })
    }
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let angle = 0, running = true

  function renderSingle() {
    ctx.clearRect(0, 0, w, h)
    drawTorus(0)
  }

  function drawTorus(offset) {
    const sinA = Math.sin(offset), cosA = Math.cos(offset)
    const sinB = Math.sin(offset * 0.4), cosB = Math.cos(offset * 0.4)

    const projected = verts.map(v => {
      let y1 = v.y * cosB - v.z * sinB
      let z1 = v.y * sinB + v.z * cosB
      let x1 = v.x
      let x2 = x1 * cosA + z1 * sinA
      let z2 = -x1 * sinA + z1 * cosA
      const f = focal / (focal + z2 + 5)
      return { sx: x2 * f * sc + cx, sy: y1 * f * sc + cy, z: z2 }
    })

    ctx.lineCap = 'round'

    for (let ui = 0; ui < uSegs; ui++) {
      for (let vi = 0; vi < vSegs; vi++) {
        const idx = ui * vSegs + vi
        const nu = ((ui + 1) % uSegs) * vSegs + vi
        const nv = ui * vSegs + (vi + 1) % vSegs
        const p1 = projected[idx], p2 = projected[nu], p3 = projected[nv]

        const d1 = (p1.z + 6) / 12
        const a1 = 0.04 + d1 * 0.35
        ctx.strokeStyle = `rgba(34, 211, 238, ${a1})`
        ctx.lineWidth = (1 + d1 * 1.5) * devicePixelRatio
        ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy); ctx.stroke()

        const d2 = (p1.z + 6) / 12
        const a2 = 0.03 + d2 * 0.25
        ctx.strokeStyle = `rgba(34, 211, 238, ${a2})`
        ctx.lineWidth = (0.8 + d2 * 1) * devicePixelRatio
        ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p3.sx, p3.sy); ctx.stroke()
      }
    }

    for (let i = 0; i < projected.length; i++) {
      const p = projected[i]
      const d = (p.z + 6) / 12
      const a = 0.08 + d * 0.55
      const s = (1.5 + d * 3) * devicePixelRatio
      ctx.fillStyle = `rgba(34, 211, 238, ${a})`
      ctx.shadowColor = `rgba(34, 211, 238, ${a * 0.5})`
      ctx.shadowBlur = 12 * d
      ctx.beginPath(); ctx.arc(p.sx, p.sy, s, 0, Math.PI * 2); ctx.fill()
    }
    ctx.shadowBlur = 0
  }

  function loop() {
    if (!running) return
    ctx.clearRect(0, 0, w, h)
    drawTorus(angle)
    angle += 0.01
    requestAnimationFrame(loop)
  }

  if (reducedMotion) { renderSingle(); return }
  loop()
}

/* ── FAQ toggle ── */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item')
  const isOpen = item.classList.toggle('open')
}

/* ── Progressive disclosure toggle ── */
function toggleDetail(btn) {
  const detail = btn.previousElementSibling
  const isOpen = detail.classList.toggle('open')
  btn.classList.toggle('open')
  btn.innerHTML = isOpen ? 'Less <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>' : 'Details <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>'
}

/* ═══════════════════════════════════════════
   CHART UTILITIES
   ═══════════════════════════════════════════ */

function setupCanvas(canvas, w, h) {
  const dpr = window.devicePixelRatio || 1
  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  return ctx
}

function createDonutChart(canvas) {
  const percent = parseFloat(canvas.dataset.percent) / 100
  const size = canvas.parentElement.clientWidth || 160
  const ctx = setupCanvas(canvas, size, size)
  const cx = size / 2, cy = size / 2, r = size * 0.34, lw = size * 0.07
  let startTime = null
  const dur = 1500

  function draw(p) {
    ctx.clearRect(0, 0, size, size)
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'
    ctx.lineWidth = lw
    ctx.stroke()
    const end = -Math.PI / 2 + Math.PI * 2 * percent * p
    const grad = ctx.createLinearGradient(cx - r, cy, cx + r, cy)
    grad.addColorStop(0, '#22d3ee')
    grad.addColorStop(1, '#06b6d4')
    ctx.beginPath()
    ctx.arc(cx, cy, r, -Math.PI / 2, end)
    ctx.strokeStyle = grad
    ctx.lineWidth = lw
    ctx.lineCap = 'round'
    ctx.stroke()
  }

  function anim(time) {
    if (!startTime) startTime = time
    const el = Math.min((time - startTime) / dur, 1)
    const e = 1 - Math.pow(1 - el, 3)
    draw(e)
    if (el < 1) requestAnimationFrame(anim)
  }
  requestAnimationFrame(anim)
}

function createRadarChart(canvas) {
  const labels = ['Vulnerability\nAssessment', 'Patch\nManagement', 'WAN\nAcceleration', 'Managed\nSIEM', 'Cloud\nSecurity', 'Data Center\nOps', 'Compliance\n& GRC', 'IT\nAdvisory']
  const values = [92, 88, 78, 95, 90, 85, 82, 75]
  const ctx = setupCanvas(canvas, 400, 400)
  const cx = 200, cy = 200, r = 140, n = labels.length, levels = 4
  let startTime = null
  const dur = 1500

  function draw(p) {
    ctx.clearRect(0, 0, 400, 400)
    const ar = r * Math.min(p * 1.1, 1)
    const ip = Math.min(p * 1.4, 1)
    for (let lv = 1; lv <= levels; lv++) {
      const lr = (ar / levels) * lv
      ctx.beginPath()
      for (let i = 0; i <= n; i++) {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2
        const x = cx + lr * Math.cos(a), y = cy + lr * Math.sin(a)
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      ctx.stroke()
    }
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + ar * Math.cos(a), cy + ar * Math.sin(a))
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.stroke()
    }
    ctx.beginPath()
    for (let i = 0; i <= n; i++) {
      const idx = i % n
      const a = (Math.PI * 2 * idx) / n - Math.PI / 2
      const v = (values[idx] / 100) * ar * ip
      const x = cx + v * Math.cos(a), y = cy + v * Math.sin(a)
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.closePath()
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, ar)
    grad.addColorStop(0, 'rgba(34,211,238,0.2)')
    grad.addColorStop(1, 'rgba(6,182,212,0.04)')
    ctx.fillStyle = grad
    ctx.fill()
    ctx.strokeStyle = '#22d3ee'
    ctx.lineWidth = 2
    ctx.stroke()
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n - Math.PI / 2
      const v = (values[i] / 100) * ar * ip
      const x = cx + v * Math.cos(a), y = cy + v * Math.sin(a)
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#22d3ee'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x, y, 1.5, 0, Math.PI * 2)
      ctx.shadowColor = '#22d3ee'
      ctx.shadowBlur = 8
      ctx.fill()
      ctx.shadowBlur = 0
    }
    ctx.font = '11px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n - Math.PI / 2
      const lx = cx + (ar + 30) * Math.cos(a), ly = cy + (ar + 30) * Math.sin(a)
      const parts = labels[i].split('\n')
      ctx.fillStyle = 'rgba(148,163,184,0.85)'
      parts.forEach((line, li) => {
        ctx.fillText(line, lx, ly + (li - (parts.length - 1) / 2) * 14)
      })
    }
  }

  function anim(time) {
    if (!startTime) startTime = time
    const el = Math.min((time - startTime) / dur, 1)
    const e = 1 - Math.pow(1 - el, 3)
    draw(e)
    if (el < 1) requestAnimationFrame(anim)
  }
  requestAnimationFrame(anim)
}

function createSparkline(canvas) {
  const raw = canvas.dataset.values.split(',').map(Number)
  const ctx = setupCanvas(canvas, 80, 26)
  const w = 80, h = 26
  const min = Math.min(...raw), max = Math.max(...raw)
  const range = max - min || 1
  const pts = raw.map((v, i) => ({
    x: (i / (raw.length - 1)) * w,
    y: h - ((v - min) / range) * (h - 4) - 2
  }))
  let startTime = null
  const dur = 1200

  function draw(p) {
    ctx.clearRect(0, 0, w, h)
    const dp = pts.slice(0, Math.ceil(pts.length * Math.min(p, 1)))
    if (dp.length < 2) return
    ctx.beginPath()
    ctx.moveTo(dp[0].x, h)
    dp.forEach(pt => ctx.lineTo(pt.x, pt.y))
    ctx.lineTo(dp[dp.length - 1].x, h)
    ctx.closePath()
    const grad = ctx.createLinearGradient(0, 0, 0, h)
    grad.addColorStop(0, 'rgba(34,211,238,0.25)')
    grad.addColorStop(1, 'rgba(34,211,238,0.01)')
    ctx.fillStyle = grad
    ctx.fill()
    ctx.beginPath()
    dp.forEach((pt, i) => i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y))
    ctx.strokeStyle = '#22d3ee'
    ctx.lineWidth = 1.5
    ctx.stroke()
    const last = dp[dp.length - 1]
    ctx.beginPath()
    ctx.arc(last.x, last.y, 2, 0, Math.PI * 2)
    ctx.fillStyle = '#22d3ee'
    ctx.fill()
  }

  function anim(time) {
    if (!startTime) startTime = time
    const el = Math.min((time - startTime) / dur, 1)
    const e = 1 - Math.pow(1 - el, 3)
    draw(e)
    if (el < 1) requestAnimationFrame(anim)
  }
  requestAnimationFrame(anim)
}

function initCarousel() {
  const track = document.getElementById('testimonial-track')
  const dots = document.getElementById('carousel-dots')
  if (!track || !dots) return
  const cards = track.querySelectorAll('.testimonial-card')
  const total = cards.length
  let cur = 0, timer = null

  cards.forEach((_, i) => {
    const d = document.createElement('button')
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '')
    d.setAttribute('aria-label', 'Go to testimonial ' + (i + 1))
    d.addEventListener('click', () => go(i))
    dots.appendChild(d)
  })

  function go(idx) {
    cur = idx
    track.style.transform = 'translateX(-' + (cur * 100) + '%)'
    dots.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === cur))
    resetTimer()
  }

  function next() { go((cur + 1) % total) }

  function resetTimer() {
    if (timer) clearInterval(timer)
    timer = setInterval(next, 5000)
  }
  resetTimer()

  const carousel = document.getElementById('testimonial-carousel')
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(timer))
    carousel.addEventListener('mouseleave', resetTimer)
  }
}

/* ── Cookie Consent ── */
function acceptCookies() {
  localStorage.setItem('infosec_cookie_consent', 'accepted')
  document.getElementById('cookie-banner').classList.add('hidden')
}
function declineCookies() {
  localStorage.setItem('infosec_cookie_consent', 'declined')
  document.getElementById('cookie-banner').classList.add('hidden')
}

document.addEventListener('DOMContentLoaded', () => {

  /* ── Cookie banner visibility ── */
  const consent = localStorage.getItem('infosec_cookie_consent')
  const banner = document.getElementById('cookie-banner')
  if (consent && banner) banner.classList.add('hidden')

  /* ── Service worker registration ── */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {})
  }

  /* ── HERO DOT GRID ── */
  const grid = document.getElementById('hero-grid')
  if (grid) {
    const frag = document.createDocumentFragment()
    for (let i = 0; i < 80; i++) {
      const dot = document.createElement('div')
      dot.className = 'dot'
      dot.style.left = Math.random() * 100 + '%'
      dot.style.top = Math.random() * 100 + '%'
      dot.style.animationDelay = Math.random() * 5 + 's'
      frag.appendChild(dot)
    }
    grid.appendChild(frag)
  }

  /* ── 3D HERO TORUS ── */
  initHero3D()

  /* ── TYPEWRITER ── */
  const tw = document.getElementById('typewriter')
  if (tw) {
    const words = ['Cybersecurity.', 'Cloud Infrastructure.', 'IT Management.', 'Data Resilience.']
    let idx = 0
    const tick = () => {
      idx = (idx + 1) % words.length
      tw.style.opacity = '0'
      setTimeout(() => { tw.textContent = words[idx]; tw.style.opacity = '1' }, 300)
    }
    tw.textContent = words[0]
    setInterval(tick, 2800)
  }

  /* ── HEADER: SCROLL HIDE / SHOW ── */
  const header = document.getElementById('header')
  let lastScroll = 0
  window.addEventListener('scroll', () => {
    const y = window.scrollY
    const delta = y - lastScroll
    if (y > 150 && delta > 20) header.classList.add('hidden')
    else if (delta < -20 || y <= 150) header.classList.remove('hidden')
    lastScroll = y
  }, { passive: true })

  /* ── MOBILE MENU ── */
  const menuBtn = document.getElementById('menu-btn')
  const mobileMenu = document.getElementById('mobile-menu')
  const menuOpen = document.getElementById('menu-open')
  const menuClose = document.getElementById('menu-close')
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open')
      menuOpen.style.display = open ? 'none' : 'block'
      menuClose.style.display = open ? 'block' : 'none'
    })
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open')
        menuOpen.style.display = 'block'
        menuClose.style.display = 'none'
      })
    })
  }

  /* ── ACTIVE NAV LINK ── */
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)')
  const sections = ['about', 'solutions', 'clients', 'contact']
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 120
    let active = ''
    for (const id of sections.reverse()) {
      const el = document.getElementById(id)
      if (el && el.offsetTop <= y) { active = id; break }
    }
    sections.reverse() // restore
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + active))
  }, { passive: true })

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal')
  const revealObserver = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  )
  revealEls.forEach(el => revealObserver.observe(el))

  /* ── COUNTER ANIMATION ── */
  const counters = document.querySelectorAll('.stat-value')
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const el = e.target
      if (el._counterDone) return
      if (!e.isIntersecting) {
        if (el._counterTimer) {
          clearInterval(el._counterTimer)
          el._counterTimer = null
        }
        return
      }
      const target = parseFloat(el.dataset.target)
      const suffix = el.dataset.suffix || ''
      const decimals = parseInt(el.dataset.decimals) || 0
      const duration = 1500
      const steps = 60
      const increment = target / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          el.textContent = target.toFixed(decimals) + suffix
          clearInterval(timer)
          el._counterDone = true
          el._counterTimer = null
          counterObserver.unobserve(el)
        } else {
          el.textContent = current.toFixed(decimals) + suffix
        }
      }, duration / steps)
      el._counterTimer = timer
    })
  }, { threshold: 0.3 })
  counters.forEach(el => counterObserver.observe(el))

  /* ── TILT CARDS ── */
  document.querySelectorAll('.tilt-card').forEach(card => {
    let ticking = false
    card.addEventListener('mousemove', (e) => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2, cy = rect.height / 2
        const ry = ((x - cx) / cx) * 6
        const rx = ((cy - y) / cy) * 6
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`
        ticking = false
      })
    })
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)'
    })
  })

  /* ── CLIENT MARQUEE ── */
  const mc = document.getElementById('marquee-content')
  if (mc) {
    const names = [
      'TechCorp Industries', 'Apex Financial Services', 'GlobalAero Systems',
      'MediCore Health', 'DefenseTech Ltd', 'NovaTel Communications',
      'EcoGrid Energy', 'OmniLogistics Inc', 'QuantumSoft Solutions',
    ]
    const doubled = [...names, ...names]
    doubled.forEach(n => {
      const span = document.createElement('span')
      span.textContent = n
      mc.appendChild(span)
    })
  }

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contact-form')
  if (form) {
    const btnText = document.getElementById('form-btn-text')
    const spinner = document.getElementById('form-spinner')
    const successMsg = document.getElementById('form-success')
    const errorMsg = document.getElementById('form-error')

    const fields = form.querySelectorAll('input[name], textarea')
    fields.forEach(f => {
      f.addEventListener('input', () => f.classList.remove('error'))
    })

    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      successMsg.style.display = 'none'
      errorMsg.style.display = 'none'

      // Honeypot check
      const honeypot = form.querySelector('[name="website"]')
      if (honeypot && honeypot.value.trim()) return

      // Rate limiting
      const rateKey = 'infosec_form_ts'
      const now = Date.now()
      const timestamps = JSON.parse(localStorage.getItem(rateKey) || '[]')
      const recent = timestamps.filter(t => now - t < 600000)
      if (recent.length >= 3) {
        errorMsg.textContent = 'Too many submissions. Please try again later.'
        errorMsg.style.display = 'block'
        return
      }
      recent.push(now)
      localStorage.setItem(rateKey, JSON.stringify(recent))

      // Validate
      let valid = true
      const data = {}
      fields.forEach(f => {
        const err = f.parentElement.querySelector('.form-error')
        data[f.name] = f.value.trim()
        f.classList.remove('error')
        if (err) err.textContent = ''
      })

      const check = (name, msg) => {
        if (!data[name]) {
          const f = form.querySelector(`[name="${name}"]`)
          f.classList.add('error')
          const err = f.parentElement.querySelector('.form-error')
          if (err) err.textContent = msg
          valid = false
        }
      }
      check('name', 'Name is required')
      check('email', 'Email is required')
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        const f = form.querySelector('[name="email"]')
        f.classList.add('error')
        const err = f.parentElement.querySelector('.form-error')
        if (err) err.textContent = 'Valid email is required'
        valid = false
      }
      check('message', 'Message is required')
      if (!valid) {
        const firstError = form.querySelector('.error')
        if (firstError) firstError.focus()
        return
      }

      // Submit
      btnText.style.display = 'none'
      spinner.style.display = 'inline-flex'
      const submitBtn = form.querySelector('button[type="submit"]')
      submitBtn.disabled = true

      try {
        const repo = '__GITHUB_REPO__'
        const pat = '__GITHUB_PAT__'
        if (!repo || !pat || repo === '__GITHUB_REPO__') throw new Error('GitHub config missing')

        const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${pat}`,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json',
          },
          body: JSON.stringify({
            title: `Contact: ${data.name} <${data.email}>`,
            body: `**Name:** ${data.name}\n**Email:** ${data.email}\n**Company:** ${data.company || '—'}\n**Phone:** ${data.phone || '—'}\n\n**Message:**\n${data.message}`,
            labels: ['contact'],
          }),
        })
        if (!res.ok) throw new Error('API returned ' + res.status)
        successMsg.style.display = 'block'
        form.querySelectorAll('input, textarea').forEach(f => { f.value = '' })
      } catch {
        errorMsg.style.display = 'block'
      } finally {
        btnText.style.display = 'inline'
        spinner.style.display = 'none'
        submitBtn.disabled = false
      }
    })
  }

  /* ── INIT CHARTS & CAROUSEL ── */
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return
      const el = e.target
      if (el.classList.contains('donut-chart')) createDonutChart(el)
      else if (el.id === 'radar-chart') createRadarChart(el)
      else if (el.classList.contains('sparkline')) createSparkline(el)
      chartObserver.unobserve(el)
    })
  }, { threshold: 0.3 })

  document.querySelectorAll('.donut-chart, .sparkline').forEach(el => chartObserver.observe(el))
  const radarCanvas = document.getElementById('radar-chart')
  if (radarCanvas) chartObserver.observe(radarCanvas)

  initCarousel()

  /* ── PARALLAX ON HERO SHAPES ── */
  const parallaxEls = [
    { el: document.querySelector('.shape-cube'), speed: 0.15 },
    { el: document.querySelector('.shape-hex'), speed: 0.10 },
    { el: document.querySelector('.orb-1'), speed: 0.05 },
    { el: document.querySelector('.orb-2'), speed: 0.04 },
  ].filter(p => p.el)
  let parallaxTicking = false
  window.addEventListener('scroll', () => {
    if (parallaxTicking) return
    parallaxTicking = true
    requestAnimationFrame(() => {
      const hero = document.getElementById('hero')
      if (!hero) { parallaxTicking = false; return }
      const rect = hero.getBoundingClientRect()
      const heroTop = rect.top
      const heroHeight = rect.height
      if (heroTop < window.innerHeight && heroTop > -heroHeight) {
        const scrolled = -heroTop
        parallaxEls.forEach(p => {
          p.el.style.transform = p.el.getAttribute('data-base-transform') + ` translateY(${scrolled * p.speed}px)`
        })
      }
      parallaxTicking = false
    })
  }, { passive: true })
  parallaxEls.forEach(p => {
    p.el.setAttribute('data-base-transform', p.el.style.transform || '')
  })

  /* ── PAGE-LOAD SKELETON ── */
  document.body.classList.add('loaded')
})
