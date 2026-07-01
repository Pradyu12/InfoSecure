/* ═══════════════════════════════════════════
   InfoSecure — Script
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── HERO DOT GRID ── */
  const grid = document.getElementById('hero-grid')
  if (grid) {
    const frag = document.createDocumentFragment()
    for (let i = 0; i < 60; i++) {
      const dot = document.createElement('div')
      dot.className = 'dot'
      dot.style.left = Math.random() * 100 + '%'
      dot.style.top = Math.random() * 100 + '%'
      dot.style.animationDelay = Math.random() * 5 + 's'
      frag.appendChild(dot)
    }
    grid.appendChild(frag)
  }

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
