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

/* ── Progressive disclosure toggle ── */
function toggleDetail(btn) {
  const detail = btn.previousElementSibling
  const isOpen = detail.classList.toggle('open')
  btn.classList.toggle('open')
  btn.innerHTML = isOpen ? 'Less <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>' : 'Details <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>'
}

document.addEventListener('DOMContentLoaded', () => {

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
    if (y > 80 && y > lastScroll) header.classList.add('hidden')
    else header.classList.remove('hidden')
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
      if (!e.isIntersecting) return
      const el = e.target
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
        } else {
          el.textContent = current.toFixed(decimals) + suffix
        }
      }, duration / steps)
      counterObserver.unobserve(el)
    })
  }, { threshold: 0.3 })
  counters.forEach(el => counterObserver.observe(el))

  /* ── TILT CARDS ── */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2, cy = rect.height / 2
      const ry = ((x - cx) / cx) * 6
      const rx = ((cy - y) / cy) * 6
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`
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
      if (!valid) return

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

})
